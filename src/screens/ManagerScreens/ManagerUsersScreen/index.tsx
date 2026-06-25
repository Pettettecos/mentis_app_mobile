import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button, Card, Menu, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { sponsorTeamService, userService } from '@/services/api';
import type { SponsorTeamRead, UserRead } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import { colors } from '../../../theme/colors';
import { styles } from './styles';

const ROLE_ORDER: UserRead['role'][] = ['MANAGER', 'PSYCHOLOGIST', 'EMPLOYEE'];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return '?';
  }

  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export function ManagerUsersScreen() {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const router = useRouter();
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<UserRead[]>([]);
  const [teams, setTeams] = useState<SponsorTeamRead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [openTeamMenuUserId, setOpenTeamMenuUserId] = useState<string | null>(
    null
  );
  const [updatingTeamUserId, setUpdatingTeamUserId] = useState<string | null>(
    null
  );
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(false);

    try {
      const [usersResponse, teamsResponse] = await Promise.all([
        userService.listUsers(),
        currentUser?.sponsor_id
          ? sponsorTeamService.listSponsorTeams(currentUser.sponsor_id)
          : Promise.resolve([]),
      ]);
      setUsers(usersResponse);
      setTeams(teamsResponse);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [currentUser?.sponsor_id]);

  useEffect(() => {
    void loadUsers();
  }, [loadUsers]);

  const totalUsers = useMemo(() => users.length, [users.length]);

  const roleLabel = useCallback(
    (role: UserRead['role']) => {
      if (
        role === 'MANAGER' ||
        role === 'PSYCHOLOGIST' ||
        role === 'EMPLOYEE'
      ) {
        return t(`managerCreate.roles.${role}`);
      }
      return role;
    },
    [t]
  );

  const orderedRoles = useMemo(() => {
    const extraRoles = users
      .map((user) => user.role)
      .filter((role) => !ROLE_ORDER.includes(role));
    return [...ROLE_ORDER, ...Array.from(new Set(extraRoles))];
  }, [users]);

  const groupedUsers = useMemo(
    () =>
      orderedRoles
        .map((role) => ({
          role,
          users: users.filter((user) => user.role === role),
        }))
        .filter((group) => group.users.length > 0),
    [orderedRoles, users]
  );

  const teamNameById = useMemo(
    () => new Map(teams.map((team) => [team.id, team.name])),
    [teams]
  );

  const getTeamLabel = useCallback(
    (sponsorTeamId: string | null) =>
      sponsorTeamId
        ? (teamNameById.get(sponsorTeamId) ?? t('managerDashboard.usersNoTeam'))
        : t('managerDashboard.usersNoTeam'),
    [teamNameById, t]
  );

  const handleChangeTeam = async (
    targetUser: UserRead,
    sponsorTeamId: string | null
  ) => {
    if (targetUser.sponsor_team_id === sponsorTeamId) {
      setOpenTeamMenuUserId(null);
      return;
    }

    setOpenTeamMenuUserId(null);
    setUpdatingTeamUserId(targetUser.id);

    try {
      const updatedUser = await userService.updateManagerUserTeam(
        targetUser.id,
        { sponsor_team_id: sponsorTeamId }
      );
      setUsers((currentUsers) =>
        currentUsers.map((item) =>
          item.id === updatedUser.id ? updatedUser : item
        )
      );
    } catch {
      Alert.alert(
        t('managerDashboard.usersError'),
        t('managerDashboard.usersChangeTeamError')
      );
    } finally {
      setUpdatingTeamUserId(null);
    }
  };

  const deleteUser = async (targetUser: UserRead) => {
    setDeletingUserId(targetUser.id);

    try {
      await userService.deleteUser(targetUser.id);
      setUsers((currentUsers) =>
        currentUsers.filter((item) => item.id !== targetUser.id)
      );
    } catch {
      Alert.alert(
        t('managerDashboard.usersError'),
        t('managerDashboard.usersDeleteError')
      );
    } finally {
      setDeletingUserId(null);
    }
  };

  const confirmDeleteUser = (targetUser: UserRead) => {
    Alert.alert(
      t('managerDashboard.usersDeleteTitle'),
      t('managerDashboard.usersDeleteBody', { name: targetUser.username }),
      [
        {
          text: t('managerDashboard.usersDeleteCancel'),
          style: 'cancel',
        },
        {
          text: t('managerDashboard.usersDeleteConfirm'),
          style: 'destructive',
          onPress: () => {
            void deleteUser(targetUser);
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: 20,
          paddingBottom: insets.bottom + 140,
        },
      ]}
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{t('managerDashboard.usersTitle')}</Text>
        <Text style={styles.subtitle}>{t('managerDashboard.usersBody')}</Text>
      </View>

      <View style={styles.actionRow}>
        <Button
          mode="contained"
          icon="account-plus"
          onPress={() => router.push('/new-user')}
          contentStyle={styles.actionButtonContent}
          labelStyle={styles.actionButtonLabel}
          style={styles.primaryActionButton}
        >
          {t('managerDashboard.createUser')}
        </Button>
        <Button
          mode="outlined"
          icon="account-multiple-plus"
          onPress={() => router.push('/new-team')}
          contentStyle={styles.actionButtonContent}
          labelStyle={styles.secondaryActionButtonLabel}
          style={styles.secondaryActionButton}
        >
          {t('managerDashboard.createTeam')}
        </Button>
      </View>

      {loading && (
        <Card style={styles.stateCard}>
          <Card.Content style={styles.stateContent}>
            <ActivityIndicator color={colors.primary} />
            <Text style={styles.stateText}>
              {t('managerDashboard.usersLoading')}
            </Text>
          </Card.Content>
        </Card>
      )}

      {!loading && error && (
        <Card style={styles.stateCard}>
          <Card.Content style={styles.stateContent}>
            <Text style={styles.stateText}>
              {t('managerDashboard.usersError')}
            </Text>
            <Button mode="contained" onPress={loadUsers}>
              {t('managerDashboard.usersRetry')}
            </Button>
          </Card.Content>
        </Card>
      )}

      {!loading && !error && (
        <View style={styles.listSection}>
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderLabel}>
              {t('managerDashboard.usersTitle')}
            </Text>
            <Text style={styles.listHeaderCount}>{totalUsers}</Text>
          </View>

          {users.length === 0 ? (
            <View style={styles.stateContent}>
              <Text style={styles.stateText}>
                {t('managerDashboard.usersEmpty')}
              </Text>
            </View>
          ) : (
            <View style={styles.roleGroups}>
              {groupedUsers.map((group) => (
                <View key={group.role} style={styles.roleSection}>
                  <View style={styles.roleSectionHeader}>
                    <Text style={styles.roleSectionTitle}>
                      {roleLabel(group.role)}
                    </Text>
                    <Text style={styles.roleSectionCount}>
                      {group.users.length}
                    </Text>
                  </View>

                  <View style={styles.list}>
                    {group.users.map((user) => (
                      <View key={user.id} style={styles.userRow}>
                        <View style={styles.userTopRow}>
                          <View style={styles.userAvatar}>
                            <Text style={styles.userAvatarText}>
                              {getInitials(user.username)}
                            </Text>
                          </View>

                          <View style={styles.userMain}>
                            <Text style={styles.userName}>{user.username}</Text>
                            <Text style={styles.userMeta}>
                              {t('managerDashboard.usersEmail')}: {user.email}
                            </Text>
                          </View>

                          <View style={styles.roleBadge}>
                            <Text style={styles.roleBadgeText}>
                              {roleLabel(user.role)}
                            </Text>
                          </View>
                        </View>

                        <View style={styles.userBottomRow}>
                          <Text style={styles.userMeta}>
                            {user.phone_number}
                          </Text>
                          {user.document ? (
                            <Text style={styles.userMeta}>{user.document}</Text>
                          ) : null}
                        </View>

                        <View style={styles.userActions}>
                          <Menu
                            visible={openTeamMenuUserId === user.id}
                            onDismiss={() => setOpenTeamMenuUserId(null)}
                            anchor={
                              <Button
                                mode="outlined"
                                icon="account-switch-outline"
                                onPress={() => setOpenTeamMenuUserId(user.id)}
                                disabled={
                                  updatingTeamUserId === user.id ||
                                  deletingUserId === user.id
                                }
                                contentStyle={styles.teamButtonContent}
                                labelStyle={styles.teamButtonLabel}
                                style={styles.teamButton}
                              >
                                {getTeamLabel(user.sponsor_team_id)}
                              </Button>
                            }
                          >
                            <Menu.Item
                              onPress={() => void handleChangeTeam(user, null)}
                              title={t('managerDashboard.usersNoTeam')}
                            />
                            {teams.map((team) => (
                              <Menu.Item
                                key={team.id}
                                onPress={() =>
                                  void handleChangeTeam(user, team.id)
                                }
                                title={team.name}
                              />
                            ))}
                          </Menu>

                          <Button
                            mode="text"
                            icon="trash-can-outline"
                            onPress={() => confirmDeleteUser(user)}
                            loading={deletingUserId === user.id}
                            disabled={
                              currentUser?.id === user.id ||
                              updatingTeamUserId === user.id ||
                              deletingUserId === user.id
                            }
                            compact
                            textColor="#B42318"
                            labelStyle={styles.deleteButtonLabel}
                          >
                            {t('managerDashboard.usersDelete')}
                          </Button>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F6FC',
  },
  inner: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  tagline: {
    color: '#64748B',
    marginTop: 8,
    textAlign: 'center',
    maxWidth: 220,
    lineHeight: 18,
    fontWeight: '500',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    width: '100%',
  },
  logoImage: {
    width: 140,
    height: 140,
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 24,
    paddingVertical: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  cardHeader: {
    marginBottom: 20,
  },
  cardTitle: {
    fontWeight: '800',
    color: '#0F172A',
    fontSize: 24,
  },
  cardSubtitle: {
    color: '#64748B',
    marginTop: 4,
  },
  form: {
    width: '100%',
  },
  input: {
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    height: 52,
  },
  inputOutline: {
    borderRadius: 14,
    borderWidth: 1.5,
  },
  formActions: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  forgotText: {
    color: '#1A90B9',
    fontWeight: '600',
    fontSize: 14,
  },
  loginButton: {
    borderRadius: 14,
    marginTop: 8,
  },
  buttonContent: {
    height: 56,
  },
  buttonLabel: {
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 1.2,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
  },
  footerText: {
    color: '#94A3B8',
    letterSpacing: 0.5,
  },
});

import * as Localization from 'expo-localization';

const fallbackLocale = 'pt-BR';
const timezonePattern = /(Z|[+-]\d{2}:?\d{2})$/i;

function getChatLocale(): string {
  return Localization.getLocales()[0]?.languageTag || fallbackLocale;
}

function getChatTimeZone(): string | undefined {
  return Localization.getCalendars()[0]?.timeZone ?? undefined;
}

function toValidDate(value: string): Date | null {
  const normalizedValue = timezonePattern.test(value) ? value : `${value}Z`;
  const date = new Date(normalizedValue);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatChatDate(
  value: string,
  fallbackLabel = '--/--/----'
): string {
  const date = toValidDate(value);

  if (!date) {
    return fallbackLabel;
  }

  return date.toLocaleDateString(getChatLocale(), {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: getChatTimeZone(),
  });
}

export function formatChatTime(value: string, fallbackLabel = '--:--'): string {
  const date = toValidDate(value);

  if (!date) {
    return fallbackLabel;
  }

  return date.toLocaleTimeString(getChatLocale(), {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: getChatTimeZone(),
  });
}

export function formatChatDateLabel(
  value: string,
  fallbackLabel = '--/--/----'
): string {
  const date = toValidDate(value);

  if (!date) {
    return fallbackLabel;
  }

  return date.toLocaleDateString(getChatLocale(), {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: getChatTimeZone(),
  });
}

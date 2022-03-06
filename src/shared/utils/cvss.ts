const BASIC_METRICS: any = {
  AV: {
    title: 'Вектор атаки (AV):',
    N: 'Сетевой (N)',
    A: 'Смежная сеть (A)',
    L: 'Локальный (L)',
    P: 'Физический (P)',
  },
  AC: {
    title: 'Сложность атаки (AC):',
    H: 'Высокая (H)',
    L: 'Низкая (L)',
    M: 'Средняя (M)',
  },
  PR: {
    title: 'Уровень привилегий (PR):',
    H: 'Высокая (H)',
    L: 'Низкая (L)',
    N: 'Не требуется (N)',
  },
  UI: {
    title: 'Взаимодействие с пользователем (UI):',
    R: 'Требуется (R)',
    N: 'Не требуется (N)',
  },
  S: {
    title: 'Влияние на другие компоненты системы (S):',
    U: 'Не оказывает (U)',
    C: 'Оказывает (C)',
  },
  C: {
    title: 'Влияние на конфиденциальность (С):',
    N: 'Не оказывает (N)',
    L: 'Низкие (L)',
    H: 'Высокая (H)',
    P: 'Частичное (P)',
    C: 'Полное (С)',
  },
  I: {
    title: 'Влияние на целостность (I):',
    N: 'Не оказывает (N)',
    L: 'Низкие (L)',
    H: 'Высокая (H)',
    P: 'Частичное (P)',
    C: 'Полное (С)',
  },
  A: {
    title: 'Влияние на доступность (A):',
    N: 'Не оказывает (N)',
    L: 'Низкие (L)',
    H: 'Высокая (H)',
    P: 'Частичное (P)',
    C: 'Полное (С)',
  },
  AU: {
    title: 'Аутентификация (Au):',
    M: 'Множественная (M)',
    S: 'Единственная (S)',
    N: 'Не требуется (N)',
  },
};

const cvss = (string: any) => {
  const cvssString = string.slice(6).split('/');

  const arrayValues = cvssString.map((el: any) => {
    const typeAndValue = el.split(':');
    return {
      type: typeAndValue[0],
      value: typeAndValue[1],
    };
  });

  const normalText = arrayValues.map((el: any) => {
    const type = el.type;
    const value = el.value;
    const bm = BASIC_METRICS[type];
    if (!bm) return `Нет данных о типе ${type} и значение ${value}`;
    return `${bm.title} ${bm[value] ? bm[value] : `Нет данных о значение ${value}`}`;
  });

  return {
    normalText,
  };
};

export default cvss;

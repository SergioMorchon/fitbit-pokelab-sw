import { gettext } from 'i18n';

export const getStatName = (stat: number) => gettext(`stat_${stat}`);

export const getTypeName = (type: number) => gettext(`type_${type}`);

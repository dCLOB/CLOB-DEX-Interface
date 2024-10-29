import dayjs from "dayjs";

export const formatDateTime = (date: string) => dayjs(date).format("DD.MM.YYYY HH:mm");

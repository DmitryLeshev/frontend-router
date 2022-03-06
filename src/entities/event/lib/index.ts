import { _trDate } from "shared/utils";

export function getFormattedCreationTime(timestamp: number) {
  return _trDate.transformDate(timestamp, _trDate.hh_mm_DD_MM_YYYY);
}

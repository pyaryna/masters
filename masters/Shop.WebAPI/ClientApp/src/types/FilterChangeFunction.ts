import { CheckboxValueType } from "antd/lib/checkbox/Group";

export type FilterChangeFunction = (name: string, checkedValues: CheckboxValueType[]) => void;
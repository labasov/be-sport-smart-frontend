import { useTranslation } from "react-i18next";

import { DynamicNamespace, StaticNamespace } from "../constants/LocalizationConstants";

export const useDynamicTranslation = () => useTranslation(DynamicNamespace);
export const useStaticTranslation = () => useTranslation(StaticNamespace);
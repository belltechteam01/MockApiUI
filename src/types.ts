export interface CampaignProps {
  lastUpdatedDate?: string;
  communications?: {
    languageCode?: string;
    textMessage?: string;
    unsubscribeMessage?: string;
  }[];
  companyId?: string;
  expiryDate?: string;
  campaignStatus?: string;
  scheduleInfo?: {
    campaignType?: "immediately" | "scheduled" | "recurring";
    scheduledScheduleDetails?: {
      sendOn?: string;
      sendTime?: string;
      timeFormat?: string;
    };
    recurringScheduleDetails?: {
      timeFormat?: string;
      startDate?: string;
      startTime?: string;
      willEnd?: boolean;
      endDate?: string;
      repeats?: "daily" | "weekly" | "monthly";
      repeatEvery?: number;
      weeklyRepeatingDetails?: {
        daysInWeek?: string[];
      };
      monthlyRepeatingDetails?: {
        repeatingType?: "each" | "on_the";
        repeatEach?: number[];
        onThe?: {
          th?: string;
          onDay?: string;
        };
      };
    };
    dynamicScheduleDetails?: {
      triggerField?: string;
      triggerLocation?: string;
      deliveryFrequency?: "one_time" | "multiple";
      whenToTrigger?: {
        whenToTriggerValue?: number;
        whenToTriggerType?: "hours" | "days";
        whenToTriggerOn?: "on" | "before" | "after";
      };
      timeToTrigger?: string;
      dynamicSchedulesTimeZone?: string;
      templateToUse?: string;
    }[];
  };
  sendTo?: string[];
  creationDate?: string;
  generalInfo?: {
    campaignCategory?: string;
    campaignName?: string;
    journeyTags?: string[];
    selectedLanguages?: {
      languageCode?: string;
      languageName?: string;
    }[];
    defaultLanguage?: {
      languageCode?: string;
      languageName?: string;
    };
  };
  campaignId?: string;
}

export interface NumberFormating {
  decimalPlaces?: number;
  useSeparators?: boolean;
  negativeNumberRef?: string;
}

export interface CurrencyFormating {
  decimalPlaces?: number;
  currencySymbol?: string;
  negativeNumberRef?: string;
}

export interface DateFormating {
  dateRef?: string;
  dateInput?: string;
}

export interface TimeFormating {
  timeRef?: string;
  timeInput?: string;
}

export interface PercentageFormating {
  decimalPlaces?: number;
}

export interface CustomFormating {
  customType?: string;
  customRef?: string;
}

export interface DynamicFieldProps {
  lastUpdatedDate?: string;
  dFId?: string;
  companyId?: string;
  campaignCategoryCode?: string;
  dFCd?: string;
  dFVal?: string;
  creationDate?: string;
  dFNm?: string;
  dFType?: string;
  dFDefaultValue?: string;
  needsFormating?: boolean;
  formatSettings?:
    | NumberFormating
    | CurrencyFormating
    | DateFormating
    | TimeFormating
    | PercentageFormating
    | CustomFormating;
}

export interface NewDynamicFieldProps {
  dFId?: string;
  companyId?: string;
  campaignCategoryCode?: string;
  dFCd?: string;
  dFVal?: string;
  dFNm?: string;
  dFType?: string;
  dFDefaultValue?: string;
  needsFormating?: boolean;
  formatSettings?:
    | NumberFormating
    | CurrencyFormating
    | DateFormating
    | TimeFormating
    | PercentageFormating
    | CustomFormating;
}

export interface NewTemplateProps {
  companyId?: string;
  journeyCode?: string[];
  templateName?: string;
  templateInfo?: TemplateInfoProps[];
  selectedLanguages?: {
    languageCode?: string;
    languageName?: string;
  }[];
  versionNumber?: string;
  categoryCode?: string;
}

export interface TemplateInfoProps {
  SMS: {
    channel?: string;
    templateContent?: string;
    variableList?: {
      dynamicFieldCode?: string;
      isRequired?: boolean;
    }[];
  };
}

export interface TemplateProps {
  lastUpdatedDate?: string;
  expiryDate?: string;
  companyId?: string;
  journeyCode?: string[];
  templateName?: string;
  templateInfo?: TemplateInfoProps[];
  templateId?: string;
  selectedLanguages?: {
    languageCode?: string;
    languageName?: string;
  }[];
  creationDate?: string;
  versionNumber?: string;
  categoryCode?: string;
}

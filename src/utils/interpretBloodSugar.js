
export function interpretBloodSugar(value, type) {
  const v = parseFloat(value);
  if (isNaN(v) || v <= 0) {
    return null;
  }

  if (type === 'FBS') {
    
    if (v < 54) {
      return {
        categoryKey: 'criticallyHypoglycemic',
        category: 'Critically Hypoglycemic',
        severity: 'critical',
        range: 'Reference: Below 54 mg/dL is severe hypoglycemia.',
        advicePoints: [
          'adv_fbs_critlo_1',
          'adv_fbs_critlo_2',
          'adv_fbs_critlo_3',
          'adv_fbs_critlo_4',
          'adv_fbs_critlo_5',
        ],
        relatedScreens: [
          { route: 'Sick Day Management', labelKey: 'sickDayManagement' },
          { route: 'Health Education', labelKey: 'healthEducation' },
        ],
      };
    }
    if (v < 70) {
      return {
        categoryKey: 'hypoglycemic',
        category: 'Hypoglycemic',
        severity: 'warning',
        range: 'Reference: 54–69 mg/dL is mild to moderate hypoglycemia.',
        advicePoints: [
          'adv_fbs_hypo_1',
          'adv_fbs_hypo_2',
          'adv_fbs_hypo_3',
          'adv_fbs_hypo_4',
          'adv_fbs_hypo_5',
        ],
        relatedScreens: [
          { route: 'Dietary Advice', labelKey: 'dietaryAdvice' },
          { route: 'Sick Day Management', labelKey: 'sickDayManagement' },
        ],
      };
    }
    if (v < 110) {
      return {
        categoryKey: 'normal',
        category: 'Normal',
        severity: 'success',
        range: 'Reference (fasting): 70–109 mg/dL is the normal range.',
        advicePoints: [
          'adv_fbs_normal_1',
          'adv_fbs_normal_2',
          'adv_fbs_normal_3',
          'adv_fbs_normal_4',
          'adv_fbs_normal_5',
        ],
        relatedScreens: [
          { route: 'Health Education', labelKey: 'healthEducation' },
          { route: 'Exercises', labelKey: 'exercises' },
          { route: 'Dietary Advice', labelKey: 'dietaryAdvice' },
        ],
      };
    }
    if (v < 126) {
      return {
        categoryKey: 'prediabetic',
        category: 'Prediabetic',
        severity: 'warning',
        range: 'Reference (fasting): 100–125 mg/dL indicates prediabetes.',
        advicePoints: [
          'adv_fbs_pre_1',
          'adv_fbs_pre_2',
          'adv_fbs_pre_3',
          'adv_fbs_pre_4',
          'adv_fbs_pre_5',
        ],
        relatedScreens: [
          { route: 'Health Education', labelKey: 'healthEducation' },
          { route: 'Exercises', labelKey: 'exercises' },
          { route: 'Dietary Advice', labelKey: 'dietaryAdvice' },
        ],
      };
    }
    if (v < 250) {
      return {
        categoryKey: 'diabetic',
        category: 'Diabetic',
        severity: 'danger',
        range: 'Reference (fasting): ≥126 mg/dL is in the diabetic range.',
        advicePoints: [
          'adv_fbs_diab_1',
          'adv_fbs_diab_2',
          'adv_fbs_diab_3',
          'adv_fbs_diab_4',
          'adv_fbs_diab_5',
        ],
        relatedScreens: [
          { route: 'Health Education', labelKey: 'healthEducation' },
          { route: 'Exercises', labelKey: 'exercises' },
          { route: 'Dietary Advice', labelKey: 'dietaryAdvice' },
          { route: 'Foot Care', labelKey: 'footCare' },
          { route: 'Sick Day Management', labelKey: 'sickDayManagement' },
        ],
      };
    }
    return {
      categoryKey: 'criticallyHighSugar',
      category: 'Critically High Sugar',
      severity: 'critical',
      range: 'Reference: ≥250 mg/dL is critically high (hyperglycemic crisis risk).',
      advicePoints: [
        'adv_fbs_crithi_1',
        'adv_fbs_crithi_2',
        'adv_fbs_crithi_3',
        'adv_fbs_crithi_4',
        'adv_fbs_crithi_5',
      ],
      relatedScreens: [
        { route: 'Sick Day Management', labelKey: 'sickDayManagement' },
        { route: 'Foot Care', labelKey: 'footCare' },
      ],
    };
  }

  if (type === 'HbA1c') {
    
    if (v < 4) {
      return {
        categoryKey: 'unusuallyLow',
        category: 'Unusually Low',
        severity: 'warning',
        range: 'Reference: HbA1c is rarely below 4%. Normal is below 5.7%.',
        advicePoints: [
          'adv_hba_low_1',
          'adv_hba_low_2',
          'adv_hba_low_3',
        ],
        relatedScreens: [
          { route: 'Health Education', labelKey: 'healthEducation' },
          { route: 'Sick Day Management', labelKey: 'sickDayManagement' },
        ],
      };
    }
    if (v < 5.7) {
      return {
        categoryKey: 'normal',
        category: 'Normal',
        severity: 'success',
        range: 'Reference: Normal HbA1c is below 5.7%.',
        advicePoints: [
          'adv_hba_normal_1',
          'adv_hba_normal_2',
          'adv_hba_normal_3',
          'adv_hba_normal_4',
        ],
        relatedScreens: [
          { route: 'Health Education', labelKey: 'healthEducation' },
          { route: 'Exercises', labelKey: 'exercises' },
          { route: 'Dietary Advice', labelKey: 'dietaryAdvice' },
        ],
      };
    }
    if (v < 6.5) {
      return {
        categoryKey: 'prediabetic',
        category: 'Prediabetic',
        severity: 'warning',
        range: 'Reference: Prediabetes range is 5.7–6.4%.',
        advicePoints: [
          'adv_hba_pre_1',
          'adv_hba_pre_2',
          'adv_hba_pre_3',
          'adv_hba_pre_4',
          'adv_hba_pre_5',
        ],
        relatedScreens: [
          { route: 'Health Education', labelKey: 'healthEducation' },
          { route: 'Exercises', labelKey: 'exercises' },
          { route: 'Dietary Advice', labelKey: 'dietaryAdvice' },
        ],
      };
    }
    if (v < 9) {
      return {
        categoryKey: 'diabetic',
        category: 'Diabetic',
        severity: 'danger',
        range: 'Reference: Diabetes is diagnosed at HbA1c ≥6.5%. Target for most adults is below 7%.',
        advicePoints: [
          'adv_hba_diab_1',
          'adv_hba_diab_2',
          'adv_hba_diab_3',
          'adv_hba_diab_4',
          'adv_hba_diab_5',
        ],
        relatedScreens: [
          { route: 'Health Education', labelKey: 'healthEducation' },
          { route: 'Exercises', labelKey: 'exercises' },
          { route: 'Dietary Advice', labelKey: 'dietaryAdvice' },
          { route: 'Foot Care', labelKey: 'footCare' },
        ],
      };
    }
    return {
      categoryKey: 'criticallyHigh',
      category: 'Critically High',
      severity: 'critical',
      range: 'Reference: HbA1c above 9% indicates poorly controlled diabetes with high complication risk.',
      advicePoints: [
        'adv_hba_crithi_1',
        'adv_hba_crithi_2',
        'adv_hba_crithi_3',
        'adv_hba_crithi_4',
        'adv_hba_crithi_5',
      ],
      relatedScreens: [
        { route: 'Health Education', labelKey: 'healthEducation' },
        { route: 'Exercises', labelKey: 'exercises' },
        { route: 'Dietary Advice', labelKey: 'dietaryAdvice' },
        { route: 'Foot Care', labelKey: 'footCare' },
        { route: 'Sick Day Management', labelKey: 'sickDayManagement' },
      ],
    };
  }

  return null;
}

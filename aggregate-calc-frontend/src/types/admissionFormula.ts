export type AdmissionFormula = {
    jamb_weight: number;
    putme_weight: number;
    olevel_weight: number;

    jamb_divisor: number;
    putme_divisor: number | null;

    putme_max_score: number | null;
    max_olevel_points: number;
};
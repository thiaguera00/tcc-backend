export interface ICreateProgress {
    user_id: string;
    phase_id: string;
    status: string;
    score: number;
}

export interface IUpdateProgress {
    user_id?: string;
    phase_id?: string;
    status?: string;
    score?: number;
    finished_at?: Date;
}
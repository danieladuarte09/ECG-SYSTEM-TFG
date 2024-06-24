export default interface Patient {
    patientId: string;
    patientName: string;
    patientAge: number;
    patientCondition: string;
    ecgData: number[];
    Notes: string;
    date: {
      hour: string;
      date: string;
    };
  }
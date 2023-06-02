export interface PrintJobEntityInterface {
  PRINTJOB_UID: string;
  PRINTJOB_USER: string;
  PRINTJOB_TIME: Date;
  PRINTJOB_FILE: FileData[];
}
export class PrintJobEntity implements PrintJobEntityInterface {
  public PRINTJOB_UID: string;

  public PRINTJOB_USER: string;

  public PRINTJOB_TIME: Date;

  public PRINTJOB_FILE: FileData[];

  constructor(props:PrintJobEntityInterface) {
    this.PRINTJOB_UID = props.PRINTJOB_UID;
    this.PRINTJOB_USER = props.PRINTJOB_USER;
    this.PRINTJOB_TIME = props.PRINTJOB_TIME;
    this.PRINTJOB_FILE = props.PRINTJOB_FILE;
  }
}

export interface FileData {
  originalname: string;
  buffer: Buffer;
}

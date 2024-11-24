export interface IAccount {
  CompanyName: string;
  AccountName: string;
  AccountNumber: string;
  GroupAccountNumber: string;
  SubAccounts: IAccount[];
}

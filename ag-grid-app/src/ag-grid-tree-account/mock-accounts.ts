import { IAccount } from "./types.def";

export const mockAccounts: IAccount[] = [
  {
    CompanyName: "Dummy Comp. LLC",
    AccountName: "Dummy Comp. LLC",
    AccountNumber: "Parent1",
    GroupAccountNumber: "Group1",
    SubAccounts: [
      {
        CompanyName: "Dummy Comp. LLC.",
        AccountName: "Dummy Comp. LLC.",
        AccountNumber: "Child1",
        GroupAccountNumber: "Group1",
        SubAccounts: []
      }
    ]
  },
  {
    CompanyName: "Childless Comp. LLC",
    AccountName: "Childless Comp. LLC",
    AccountNumber: "Parent2",
    GroupAccountNumber: "Group2",
    SubAccounts: []
  },
  {
    CompanyName: "Other Comp. LLC  Parent",
    AccountName: "Other Comp. LLC  Parent",
    AccountNumber: "Parent3",
    GroupAccountNumber: "Group3",
    SubAccounts: [
      {
        CompanyName: "Other Comp. LLC",
        AccountName: "Other Comp. LLC",
        AccountNumber: "Child2",
        GroupAccountNumber: "Group3",
        SubAccounts: []
      },
      {
        CompanyName: "Other Comp. LLC",
        AccountName: "Other Comp. LLC",
        AccountNumber: "Child3",
        GroupAccountNumber: "Group3",
        SubAccounts: []
      },
      {
        CompanyName: "Other Comp. LLC",
        AccountName: "Other Comp. LLC",
        AccountNumber: "Child4",
        GroupAccountNumber: "Group3",
        SubAccounts: []
      },
      {
        CompanyName: "Other Comp. LLC",
        AccountName: "Other Comp. LLC",
        AccountNumber: "Child5",
        GroupAccountNumber: "Group3",
        SubAccounts: []
      },
      {
        CompanyName: "Other Comp. LLC",
        AccountName: "Other Comp. LLC",
        AccountNumber: "Child6",
        GroupAccountNumber: "Group3",
        SubAccounts: []
      },
      {
        CompanyName: "Other Comp. LLC",
        AccountName: "Other Comp. LLC",
        AccountNumber: "Child7",
        GroupAccountNumber: "Group3",
        SubAccounts: []
      }
    ]
  },
  {
    CompanyName: "Childless Comp#2. LLC",
    AccountName: "Childless Comp#2. LLC",
    AccountNumber: "Parent4",
    GroupAccountNumber: "Group4",
    SubAccounts: []
  }
];

export function formatChildren(data: IAccount[]) {
  let newArray: object[] = [];
  data.map(parentAcct => {
    let children = parentAcct.SubAccounts;
    let parentHierarchy: string[] = [parentAcct.AccountNumber];
    let parentDataForNode = {
      ...parentAcct,
      hierarchy: parentHierarchy
    };
    newArray.push(parentDataForNode);
    children.forEach(child => {
      let childHierarchy: string[] = [
        parentAcct.AccountNumber,
        child.AccountNumber
      ];
      let childDataForNode = {
        ...child,
        hierarchy: childHierarchy
      };
      newArray.push(childDataForNode);
    });
    return newArray;
  });
  console.log("render check", Date.now());
  return newArray;
}

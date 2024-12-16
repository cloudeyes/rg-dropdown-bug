import { DataColumn, DataField, DataValues, ValueType } from 'realgrid-2.7.2';

export const fields = [
  {
    fieldName: 'Name',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'FullName',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'Age',
    dataType: ValueType.NUMBER,
  },
  {
    fieldName: 'Company',
    dataType: ValueType.TEXT,
  },
  {
    fieldName: 'Email',
    dataType: ValueType.TEXT,
  },
] as DataField[];

export const columns = [
  {
    name: 'Name',
    fieldName: 'Name',
    width: 80,
    sortable: false,
    header: {
      text: 'Name',
    },
  },
  {
    name: 'FullName',
    fieldName: 'FullName',
    width: 150,
    header: {
      text: 'Full Name',
    },
  },
  {
    name: 'Company',
    fieldName: 'Company',
    width: 220,
    header: {
      text: 'Company Name',
    },
  },
  {
    name: 'Age',
    fieldName: 'Age',
    width: 130,
    header: {
      text: 'Age',
    },
  },
  {
    name: 'Email',
    fieldName: 'Email',
    width: 300,
    header: {
      text: 'Email',
    },
  },
] as DataColumn[];

export const rows: DataValues[]= [
  {
    Name: 'Kessie',
    FullName: 'Vijendra N. Raj',
    Email: 'mus.Donec.dignissim@Praesent.edu',
    Company: 'Arcu Et Pede Incorporated',
    Age: '17',
  },
  {
    Name: 'Evelyn',
    FullName: 'Hridaynath K. Ismail',
    Email: 'fringilla.euismod@elementum.edu',
    Company: 'Aliquam Tincidunt Ltd',
    Age: '28',
  },
];

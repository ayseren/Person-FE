import React from "react";
import RouterService from "../../service/RouterService";
import { DataGrid, Form, Popup, SpeedDialAction, Toolbar } from "devextreme-react";
import { Column, Editing, Lookup, Paging, RequiredRule } from "devextreme-react/data-grid";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import CustomStore from "devextreme/data/custom_store";
import styles from "./Person.module.scss";

type Person = {
  id?: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  birthDate: Date;
  gender: string;
  location: string;
};

const genders = [
  { id: 1, name: "FEMALE" },
  { id: 2, name: "MALE" },
];

const Person: React.FC = () => {
  let grid: DataGrid<Person, any> | null = null;

  const addRow = () => {
    if (grid) {
      grid.instance.addRow();
      grid.instance.deselectAll();
    }
  };

  const ordersData = new CustomStore({
    load: async () => await RouterService.getPersons(),
    insert: async (values: Person) => {
      const addedValues = {
        lastName: values.lastName,
        firstName: values.firstName,
        middleName: values.middleName !== undefined ? values.middleName : "",
        birthDate: values.birthDate,
        gender: values.gender,
        location: values.location,
      };

      return await RouterService.addPerson(addedValues);
    },
    update: async (key: Person, values: Person) => {
      if (key.id) {
        const updatedValues = {
          lastName: values.lastName ? values.lastName : key.lastName,
          firstName: values.firstName ? values.firstName : key.firstName,
          middleName: values.middleName !== undefined ? values.middleName : key.middleName,
          birthDate: values.birthDate ? values.birthDate : key.birthDate,
          gender: values.gender ? values.gender : key.gender,
          location: values.location ? values.location : key.location,
        };

        return await RouterService.updatePerson(key.id, updatedValues);
      }
    },
    remove: async (key: Person) => {
      if (key.id) return await RouterService.deletePerson(key.id);
    },
  });

  return (
    <div className={styles.container}>
      <SpeedDialAction icon="add" label="Add" index={1} onClick={addRow} />

      <DataGrid
        dataSource={ordersData}
        showBorders={true}
        id="personTable"
        key="Id"
        allowColumnReordering={true}
        ref={(ref) => {
          grid = ref;
        }}
      >
        <Editing allowUpdating={true} allowDeleting={true} mode="popup">
          <Form labelLocation="top" />
          <Popup showTitle={true} title="Row in the editing state" />
        </Editing>
        <Column dataField="firstName" caption="First Name">
          <RequiredRule />
        </Column>
        <Column dataField="middleName" caption="Middle Name" />
        <Column dataField="lastName" caption="Last Name">
          <RequiredRule />
        </Column>
        <Column dataField="birthDate" caption="Birth Date" dataType="date">
          <RequiredRule />
        </Column>
        <Column dataField="gender" caption="Gender">
          <Lookup dataSource={genders} valueExpr="name" displayExpr="name" />
          <RequiredRule />
        </Column>
        <Column dataField="location" caption="Location">
          <RequiredRule />
        </Column>
        <Paging defaultPageSize={10} />
      </DataGrid>
    </div>
  );
};

export default Person;

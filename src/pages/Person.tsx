import React, { useEffect, useState } from "react";
import RouterService from "../../service/RouterService";
import { DataGrid, Form, Popup, SpeedDialAction, Toolbar } from "devextreme-react";
import { Column, Editing, Item, Lookup, Pager, Paging } from "devextreme-react/data-grid";
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

const Person: React.FC = () => {
  const [lookupDataSource, setLookupDataSource] = useState<{ id: number; name: string }[]>([]);

  let grid: DataGrid<Person, any> | null = null;
  const genders = [
    { id: 1, name: "FEMALE" },
    { id: 2, name: "MALE" },
  ];

  const addRow = () => {
    if (grid) {
      grid.instance.addRow();
      grid.instance.deselectAll();
    }
  };

  const ordersData = new CustomStore({
    load: () => {
      return RouterService.getPersons();
    },
    insert: async (values: Person) => {
      const person = {
        firstName: values.firstName,
        middleName: values.middleName,
        lastName: values.lastName,
        birthDate: values.birthDate,
        gender: values.gender,
        location: values.location,
      };

      return RouterService.addPerson(person);
    },
    update: async (key: Person, values: Person) => {
      if (key.id) {
        const updatedValues = {
          lastName: values.lastName ? values.lastName : key.lastName,
          firstName: values.firstName ? values.firstName : key.firstName,
          middleName: values.middleName ? values.middleName : key.middleName,
          birthDate: values.birthDate ? values.birthDate : key.birthDate,
          gender: values.gender ? values.gender : key.gender,
          location: values.location ? values.location : key.location,
        };

        return RouterService.updatePerson(key.id, updatedValues);
      }
    },
    remove: async (key: Person) => {
      if (key.id) return RouterService.deletePerson(key.id);
    },
  });

  useEffect(() => {
    RouterService.getPersons().then((persons) => {
      const uniqueGenders = genders.filter((gender) => persons.some((person: Person) => person.gender === gender.name));

      setLookupDataSource(uniqueGenders);
    });
  }, []);

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
        <Column dataField="firstName" caption="First Name" />
        <Column dataField="middleName" caption="Middle Name" />
        <Column dataField="lastName" caption="Last Name" />
        <Column dataField="birthDate" caption="Birth Date" dataType="date" />
        <Column dataField="gender" caption="Gender">
          <Lookup dataSource={lookupDataSource} displayExpr="name" />
        </Column>
        <Column dataField="location" caption="Location" />
        <Paging defaultPageSize={10} />
      </DataGrid>
    </div>
  );
};

export default Person;

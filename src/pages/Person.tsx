import React, { useEffect, useState } from "react";
import RouterService from "../../service/RouterService";
import { DataGrid } from "devextreme-react";
import { Button, Column, Editing, Summary, TotalItem } from "devextreme-react/data-grid";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import styles from "./Person.module.scss";

enum GENDER {
  "FEMALE" = "Female",
  "MALE" = "Male",
}

type Person = {
  id: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  birthDate: Date;
  gender: GENDER;
  location: string;
};

const Person: React.FC = () => {
  const [persons, setPersons] = useState<Person[]>([{ id: 0, firstName: "", lastName: "", birthDate: new Date(), gender: GENDER.FEMALE, location: "" }]);

  useEffect(() => {
    const fetchData = async () => {
      const itemsData = await RouterService.getPersons();
      setPersons(itemsData);
    };

    fetchData();
  }, []);

  const onRowValidating = (e: any) => {
    const position = e.newData.Position;
  };

  const onEditorPreparing = (e: any) => {
    console.log("asfdf", e);
  };

  const allowDeleting = (e: any) => {
    console.log(e.row.data.Position);
  };

  const columns: any = [];
  persons.forEach((person) => {
    columns.push(
      <>
        <Column type="buttons" width={110}>
          <Button name="edit" />
          <Button name="delete" />
        </Column>
        <Column dataField={person.id} caption={person.id} />
        <Column dataField={person.firstName} caption={person.firstName} />
        <Column dataField={person.middleName} caption={person.middleName} />
        <Column dataField={person.lastName} caption={person.lastName} />
        <Column dataField={person.birthDate} caption={person.birthDate} dataType="date" />
        <Column dataField={person.gender} caption={person.gender} />
        <Column dataField={person.location} caption={person.location} />
      </>
    );
  });

  return (
    <div className={styles.container}>
      <DataGrid dataSource={persons} showBorders={true} id="personTable" key="Id" onRowValidating={onRowValidating} onEditorPreparing={onEditorPreparing}>
        <Editing mode="row" useIcons={true} allowUpdating={true} allowDeleting={allowDeleting} />
        <Column dataField="id" caption="ID" />
        <Column dataField="firstName" caption="First Name" />
        <Column dataField="middleName" caption="Middle Name" />
        <Column dataField="lastName" caption="Last Name" />
        <Column dataField="birthDate" caption="Birth Date" />
        <Column dataField="gender" caption="Gender" />
        <Column dataField="location" caption="Location" />
        {columns}
      </DataGrid>
    </div>
  );
};

export default Person;

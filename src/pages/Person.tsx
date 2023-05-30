import React, { useEffect, useState } from "react";
import RouterService from "../../service/RouterService";
import { DataGrid } from "devextreme-react";
import { Column, Summary, TotalItem } from "devextreme-react/data-grid";
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

  const columns: any = [];
  persons.forEach((person) => {
    columns.push(
      <>
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
      <DataGrid dataSource={persons} showBorders={true}>
        <Column dataField="id" caption="ID" />
        <Column dataField="firstName" caption="First Name" />
        <Column dataField="middleName" caption="Middle Name" />
        <Column dataField="lastName" caption="Last Name" />
        <Column dataField="birthDate" caption="Birth Date" />
        <Column dataField="gender" caption="Gender" />
        <Column dataField="location" caption="Location" />
        {columns}
        <Summary>
          <TotalItem column="age" summaryType="sum" displayFormat="Total: {0}" />
        </Summary>
      </DataGrid>
    </div>
  );
};

export default Person;

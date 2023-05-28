import React, { useEffect, useState } from "react";
import RouterService from "../../service/RouterService";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import { DataGrid } from "devextreme-react";
import { Column, Summary, TotalItem } from "devextreme-react/data-grid";

const Person: React.FC = () => {
  const [persons, setPersons] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const itemsData = await RouterService.getPersons();
      setPersons(itemsData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <DataGrid dataSource={persons} showBorders={true}>
        <Column dataField="id" caption="ID" />
        <Column dataField="firstName" caption="First Name" />
        <Column dataField="middleName" caption="Middle Name" />
        <Column dataField="lastName" caption="Last Name" />
        {/* Diğer sütunlar... */}
        {persons !== undefined && persons.length !== 0
          ? persons.map((person: any) => {
              <Column key={person.id} dataField={person.id} caption={person.id} />;
              <Column key={person.firstName} dataField={person.firstName} caption={person.firstName} />;
              <Column key={person.middleName} dataField={person.middleName} caption={person.middleName} />;
              <Column key={person.lastName} dataField={person.lastName} caption={person.lastName} />;
            })
          : undefined}
        <Summary>
          <TotalItem column="age" summaryType="sum" displayFormat="Total: {0}" />
        </Summary>
      </DataGrid>
    </div>
  );
};

export default Person;

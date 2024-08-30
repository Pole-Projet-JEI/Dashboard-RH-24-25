import React from 'react'
import DataTable from "../DataTable"


const RecentMeetingsColumns = [
  {id:"Title" , label:"Meeting title"},
  { id: "Department", label: "Department" },
  { id: "Date", label: "Date" },
  { id: "Time", label: "Time" },
  { id: "Duration", label: "Duration"}
]

const RecentMeetingsGrid = ({Data}) => {
  return (
    <React.Fragment>
      <DataTable columns={RecentMeetingsColumns} rowData={Data}></DataTable>
    </React.Fragment>
  )
}

export default RecentMeetingsGrid

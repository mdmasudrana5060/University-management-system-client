import { Button, Dropdown, Table, Tag } from "antd";
import type { TableColumnsType } from "antd";
import { TSemester } from "../../../types";
import {
  useGetAllRegisteredSemesterQuery,
  useUpdateRegisteredStatusMutation,
} from "../../../redux/features/admin/courseManagementApi";
import moment from "moment";
import { useState } from "react";

const items: MenuProps["items"] = [
  {
    label: "Upcoming",
    key: "UPOMING",
  },
  {
    label: "Ongoing",
    key: "ONGOING",
  },
  {
    label: "Ended",
    key: "ENDED",
  },
];

export type TTableData = Pick<
  TSemester,
  "academicSemester" | "status" | "startDate" | "endDate"
>;
const RegisteredSemesters = () => {
  const [semesterId, setSemesterId] = useState("");
  const [updateSemesterStatus] = useUpdateRegisteredStatusMutation();
  const {
    data: semesterData,
    isLoading,
    isFetching,
  } = useGetAllRegisteredSemesterQuery(undefined);

  const tableData = semesterData?.data?.map(
    ({ _id, academicSemester, startDate, endDate, status }) => ({
      key: _id,
      name: `${academicSemester.name} ${academicSemester.year}`,
      status,
      startDate: moment(new Date(startDate)).format("MMMM"),
      endDate: moment(new Date(endDate)).format("MMMM"),
    })
  );
  const handleStatusUpdate = (data) => {
    console.log(data.key);
    console.log(semesterId);
    const updateData = {
      id: semesterId,
      data: {
        status: data.key,
      },
    };
    updateSemesterStatus(updateData);
  };

  const menuProps = {
    items,
    onClick: handleStatusUpdate,
  };
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (item) => {
        let color;
        if (item === "UPCOMING") {
          color = "blue";
        } else if (item === "ONGOING") {
          color = "green";
        } else {
          color = "red";
        }
        return <Tag color={color}>{item}</Tag>;
      },
    },
    {
      title: "Start Date",
      dataIndex: "startDate",

      // onFilter: (value, record) =>
      //   record.address.indexOf(value as string) === 0,
    },
    {
      title: "End Date",
      dataIndex: "endDate",

      // onFilter: (value, record) =>
      //   record.address.indexOf(value as string) === 0,
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Dropdown menu={menuProps} trigger={["click"]}>
            <Button onClick={() => setSemesterId(item.key)}>Update</Button>
          </Dropdown>
        );
      },
    },
  ];

  // const onChange: TableProps<TTableData>["onChange"] = (
  //   _pagination,
  //   filters,
  //   _sorter,
  //   extra
  // ) => {
  //   if (extra.action === "filter") {
  //     const queryParams: TQueryParam[] = [];

  //     filters.name?.forEach((item) =>
  //       queryParams.push({ name: "name", value: item })
  //     );

  //     filters.year?.forEach((item) =>
  //       queryParams.push({ name: "year", value: item })
  //     );

  //     setParams(queryParams);
  //   }
  // };
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      // onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};
export default RegisteredSemesters;

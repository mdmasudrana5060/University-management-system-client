import { FieldValues, SubmitHandler } from "react-hook-form";
import PhForm from "../../../components/form/PhForm";
import PhInput from "../../../components/form/PhInput";
import { Button, Col, Divider, Row } from "antd";
import PhDatePicker from "../../../components/form/PhDatePicker";
import {
  useGetAllDepartmentQuery,
  useGetAllSemesterQuery,
} from "../../../redux/features/admin/academicManagement.api";
import PhSelect from "../../../components/form/PhSelect";
import { useAddStudentMutation } from "../../../redux/features/admin/useManagement.api";

//  {
//   "password":"123456789",
//   "student":{
// "name": {
//   "firstName": "Masud",
//   "middleName": "B.",
//   "lastName": "Rana"
// },
// "gender": "male",
// "dateOfBirth": "1995-04-15",
// "email": "masudrana004@gmail.com",
// "contactNo": "555123456",
// "emergencyContactNo": "555987654",
// "bloodGroup": "AB+",
// "presentAddress": "123 Maple St, Anytown, TX",
// "permanentAddress": "789 Oak St, Anytown, TX",
// "guardian": {
//   "fatherName": "Robert",
//   "fatherOccupation": "Architect",
//   "fatherContactNo": "555123123",
//   "motherName": "Martha ",
//   "motherOccupation": "Nurse",
//   "motherContactNo": "555987987"
// },
// "localGuardian": {
//   "name": "Tom ",
//   "occupation": "Teacher",
//   "contactNo": "555444555",
//   "address": "456 Birch St, Anytown, TX"
// },
// "profileImg": "https://example.com/profiles/alice_smith.jpg",
// "admissionSemester":"6739c9474281e3e24f364170",
// "isActive": "active",
// "academicDepartment":"6739bb1071624d29d1f3febc",
// " academicFaculty":"6739b9e9733a808ea1957b05"
// }
// }
const studentDefaultData = {
  password: "123456789",
  student: {
    name: {
      firstName: "Masud",
      middleName: "B.",
      lastName: "Rana",
    },
    gender: "male",
    dateOfBirth: "1995-04-15",
    email: "student4@gmail.com",
    contactNo: "555123456",
    emergencyContactNo: "555987654",
    bloodGroup: "AB+",
    presentAddress: "123 Maple St, Anytown, TX",
    permanentAddress: "789 Oak St, Anytown, TX",
    guardian: {
      fatherName: "Robert",
      fatherOccupation: "Architect",
      fatherContactNo: "555123123",
      motherName: "Martha",
      motherOccupation: "Nurse",
      motherContactNo: "555987987",
    },
    localGuardian: {
      name: "Tom",
      occupation: "Teacher",
      contactNo: "555444555",
      address: "456 Birch St, Anytown, TX",
    },

    admissionSemester: "6739c9474281e3e24f364170",
    isActive: "active",
    academicDepartment: "6739bb1071624d29d1f3febc",
    academicFaculty: "6739b9e9733a808ea1957b05",
  },
};

const CreateStudent = () => {
  const [addStudent, { data, error }] = useAddStudentMutation();
  console.log("add student data", data, error);
  const { data: sData, isLoading: sIsLoading } =
    useGetAllSemesterQuery(undefined);
  console.log("semester data", sData);
  const { data: dData, isLoading: dIsLoading } = useGetAllDepartmentQuery(
    undefined,
    { skip: sIsLoading }
  );
  console.log("department data", dData);

  const semesterOption = sData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const departmentOption = dData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    addStudent(formData);
  };
  return (
    <Row>
      <Col span={24}>
        <PhForm onSubmit={onSubmit} defaultValues={studentDefaultData}>
          <Divider>Personal Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="name.firstName"
                label="First Name"
              ></PhInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="name.middleName"
                label="Middle Name"
              ></PhInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="name.lastName"
                label="Last Name"
              ></PhInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput type="text" name="gender" label="Gender"></PhInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhDatePicker
                name="dataOfBirth"
                label="Date of Birth"
              ></PhDatePicker>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="bloodGroup"
                label="Blood Group"
              ></PhInput>
            </Col>
          </Row>
          <Divider>Contact info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput type="text" name="email" label="Email"></PhInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput type="text" name="contactNo" label="Contact"></PhInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="emergencyContactNo"
                label="Emergency Contact"
              ></PhInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="presentAddress"
                label="Present Address"
              ></PhInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="permanentAddress"
                label="Permanent Addres"
              ></PhInput>
            </Col>
          </Row>

          <Divider>Guardian</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="fatherName"
                label="Father Name"
              ></PhInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="fatherOccupation"
                label="Father Occupation"
              ></PhInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="fatherContactNo"
                label="Fther Contact No"
              ></PhInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="motherName"
                label="Mother Name"
              ></PhInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="motherOccupation"
                label="Mother Occupation"
              ></PhInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="motherContactNo"
                label="Mother Contact No"
              ></PhInput>
            </Col>
          </Row>
          <Divider>Local Guardian</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="localGuardian.name"
                label="Name"
              ></PhInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="localGuardian.occupation"
                label="Occupation"
              ></PhInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="localGuardian.contactNo"
                label="Contact"
              ></PhInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="localGuardian.address"
                label="Address"
              ></PhInput>
            </Col>
          </Row>

          <Divider>Academic Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhSelect
                options={semesterOption}
                disabled={sIsLoading}
                name="admissionSemester"
                label="Admission Semester"
              ></PhSelect>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhSelect
                options={departmentOption}
                disabled={dIsLoading}
                name="academicDepartment"
                label="Academic Department"
              ></PhSelect>
            </Col>
          </Row>

          <Button htmlType="submit">Submit</Button>
        </PhForm>
      </Col>
    </Row>
  );
};
export default CreateStudent;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from "react-hook-form";
import PhForm from "../../../components/form/PhForm";
import { Button, Col, Flex } from "antd";
import PhSelect from "../../../components/form/PhSelect";
import { semesterStatusOptions } from "../../../constants/semester";
import { toast } from "sonner";
import {
  useAddAcademicSemesterMutation,
  useGetAllSemesterQuery,
} from "../../../redux/features/admin/academicManagement.api";
import PhDatePicker from "../../../components/form/PhDatePicker";
import PhInput from "../../../components/form/PhInput";
import { TResponse } from "../../../types";

const SemesterRegistration = () => {
  const { data: academicSemester } = useGetAllSemesterQuery([
    {
      name: "sort",
      value: "year",
    },
  ]);
  const [addSemester] = useAddAcademicSemesterMutation();

  const academicSemesterOption = academicSemester?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const toastId = toast.loading("Creating...");

    const semesterData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };

    try {
      const res = (await addSemester(semesterData)) as TResponse<any>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Semester created Successfully", { id: toastId });
      }
    } catch (error: any) {
      toast.error(error.message, { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PhForm onSubmit={onSubmit}>
          <PhSelect
            label="Academic Semester"
            name="academicSemester"
            options={academicSemesterOption}
          />
          <PhSelect
            name="status"
            label="Status"
            options={semesterStatusOptions}
          />

          <PhDatePicker name="startDate" label="Start Date" />
          <PhDatePicker name="endDate" label="End Date" />
          <PhInput type="text" name="minCredit" label="Min Credit" />
          <PhInput type="text" name="maxCredit" label="Max Credit" />
          <Button htmlType="submit">Submit</Button>
        </PhForm>
      </Col>
    </Flex>
  );
};
export default SemesterRegistration;

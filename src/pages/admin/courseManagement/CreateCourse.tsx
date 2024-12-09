import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PhForm from "../../../components/form/PhForm";
import PhSelect from "../../../components/form/PhSelect";
import PhInput from "../../../components/form/PhInput";
import {
  useAddCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagementApi";
import { toast } from "sonner";
import { TResponse } from "../../../types";

const CreateCourse = () => {
  const { data: courses } = useGetAllCoursesQuery(undefined);
  const [createCourse] = useAddCourseMutation();
  console.log(courses);
  const preRequisiteCoursesOptions = courses?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const toastId = toast.loading("Creating...");

    const courseData = {
      ...data,
      code: Number(data.code),
      credits: Number(data.credits),
      isDeleted: false,
      preRequisiteCourses: data.preRequisiteCourses
        ? data.preRequisiteCourses.map((item) => ({
            course: item,
            isDeleted: false,
          }))
        : [],
    };
    console.log(courseData);

    try {
      const res = (await createCourse(courseData)) as TResponse<any>;
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
          <PhInput type="text" name="title" label="Title" />
          <PhInput type="text" name="prefix" label="Prefix" />
          <PhInput type="text" name="code" label="Code" />
          <PhInput type="text" name="credits" label="Credits" />

          <PhSelect
            mode="multiple"
            name="preRequisiteCourses"
            label="PreRequisiteCourses"
            options={preRequisiteCoursesOptions}
          />

          <Button htmlType="submit">Submit</Button>
        </PhForm>
      </Col>
    </Flex>
  );
};

export default CreateCourse;

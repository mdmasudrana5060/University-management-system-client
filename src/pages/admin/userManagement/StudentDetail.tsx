import { useParams } from "react-router-dom";

const StudentDetail = () => {
  const param = useParams();
  console.log(param);
  return (
    <div>
      <h2>Student Detail</h2>
    </div>
  );
};
export default StudentDetail;


const Course = ({ course }) => {
  const exercises_sum = course.parts.reduce((sum, cur) => sum + cur.exercises, 0);

  return (
    <>
      <h2>{course.name}</h2>
      {
        course.parts.map((part) => (<p key={part.id}> {part.name} {part.exercises} </p>))
      }

      <strong>total of {exercises_sum} exercises</strong>
    </>
  );
};


export default Course;

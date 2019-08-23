import React from "react";
import ReactDOM from "react-dom";
import useDataApi from "use-data-api";

function App() {
  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    "https://egghead.io/api/v1/fresh",
    null
  );

  const { playlists = [], courses = [], lessons = [] } = data || {};

  console.log(data);

  return (
    <div className="App">
      <h1>Playlists</h1>
      {playlists.map(playlist => {
        const { instructor } = playlist;
        return (
          <div key={playlist.slug}>
            <div>
              <a href={`https://egghead.io${playlist.path}`}>
                {playlist.title}
              </a>
            </div>
            <div>
              <img
                style={{ width: "50px", height: "50px" }}
                alt={instructor.full_name}
                src={instructor.avatar_url}
              />
              {instructor.full_name}
            </div>
            <div>{playlist.description}</div>
          </div>
        );
      })}
      <h1>Courses</h1>
      {courses.map(course => {
        const { instructor, square_cover_url } = course;
        return (
          <div key={course.slug}>
            <div>
              <a href={`https://egghead.io${course.path}`}>{course.title}</a>
            </div>
            <div>
              <img
                style={{ width: "50px", height: "50px" }}
                alt={instructor.full_name}
                src={instructor.avatar_url}
              />
              {instructor.full_name}
            </div>
            <div>
              <img
                style={{ width: "50px", height: "50px" }}
                alt={course.title}
                src={square_cover_url}
              />
            </div>

            <div>{course.description}</div>
          </div>
        );
      })}
      <h1>Lessons</h1>
      {lessons.map(lesson => {
        const { instructor, image_480_url } = lesson;
        return (
          <div key={lesson.slug}>
            <div>
              <a href={`https://egghead.io${lesson.path}`}>{lesson.title}</a>
            </div>
            <div>
              <img
                style={{ width: "50px", height: "50px" }}
                alt={lesson.title}
                src={image_480_url}
              />
            </div>
            <div>{lesson.summary}</div>
          </div>
        );
      })}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

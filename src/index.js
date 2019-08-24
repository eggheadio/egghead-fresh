import React from "react";
import ReactDOM from "react-dom";
import useDataApi from "use-data-api";
const ReactMarkdown = require("react-markdown");

const DAYS_BACK = 30;
const POPULAR_COUNT = 10;

function App() {
  const [{ data, isLoading }] = useDataApi(
    `https://egghead.io/api/v1/fresh?d=${DAYS_BACK}&pop=${POPULAR_COUNT}`
  );

  const {
    playlists = [],
    courses = [],
    lessons = [],
    podcasts = [],
    popular_courses = []
  } = data || {};

  console.log(data);

  return isLoading ? (
    <div>loading...</div>
  ) : (
    <>
      <h1>What's up at egghead for the last {DAYS_BACK} days...</h1>
      <Resources
        title="Podcasts"
        resources={podcasts}
        getImage={podcast => podcast.image_url}
        byLine={podcast => `hosted by ${podcast.contributors.join(",")}`}
        getDescription={podcast => podcast.summary}
      />
      <Resources
        title="New Courses"
        resources={courses}
        getImage={series => series.square_cover_url}
        byLine={({ instructor }) => `by ${instructor.full_name}`}
      />
      <Resources
        title="Instructor Playlists"
        resources={playlists}
        byLine={({ instructor }) => `by ${instructor.full_name}`}
      />
      <Resources
        title="Lessons"
        resources={lessons}
        byLine={({ instructor }) => `by ${instructor.full_name}`}
        getDescription={lesson => lesson.summary}
      />
      <Resources
        title="Popular Courses"
        resources={popular_courses}
        getImage={series => series.square_cover_url}
        byLine={({ instructor }) => `by ${instructor.full_name}`}
      />
    </>
  );
}

function Resources({
  title,
  resources = [],
  byLine,
  getImage,
  getDescription = resource => resource.description || ""
}) {
  return (
    resources.length > 0 && (
      <>
        <h2>{title}</h2>
        {resources.map(resource => {
          return (
            <div key={resource.slug}>
              {getImage && (
                <img
                  style={{ width: "125px", height: "125px", padding: "25px" }}
                  src={getImage(resource)}
                  alt={resource.title}
                />
              )}
              <h3>
                <a href={`https://egghead.io${resource.path}`}>
                  {resource.title}
                </a>
              </h3>
              <div>
                <em>{byLine(resource)}</em>
              </div>
              <div style={{ paddingTop: "10px" }}>
                <ReactMarkdown source={getDescription(resource)} />
              </div>
            </div>
          );
        })}
      </>
    )
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

import _ from "lodash";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 } from "uuid";

import "./App.css";

const item = {
  id: v4(),
  name: "jeevan",
  description: "Filter out ip address from google analytics",
  startDate: "2022-10-22",
  endDate: "2022-10-23",
  time: "00:20"
};
const item2 = {
  id: v4(),
  name: "jeeva",
  description: "Dom libary link is not working on vendor side",
  startDate: "2022-10-22",
  endDate: "2022-10-23",
  time: "00:20"
};
const item3 = {
  id: v4(),
  name: "jeeva",
  description: "open Quoatition details page",
  startDate: "2022-10-22",
  endDate: "2022-10-23",
  time: "00:20"
};

const item4 = {
  id: v4(),
  name: "jeeva",
  description: "vendor bulk Upload",
  startDate: "2022-10-22",
  endDate: "2022-10-23",
  time: "00:20"
};
const item5 = {
  id: v4(),
  name: "jeeva",
  description: "User is not able to see Duplicate",
  startDate: "2022-10-22",
  endDate: "2022-10-23",
  time: "00:20"
};
const item6 = {
  id: v4(),
  name: "jeeva",
  description: "Vendor Collabration changes",
  startDate: "2022-10-22",
  endDate: "2022-10-23",
  time: "00:20"
};

function App() {
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [state, setState] = useState({
    todo: {
      title: "Todo",
      items: [item, item2, item3]
    },
    planning: {
      title: "Planning",
      items: [item4, item5]
    },

    "in-progress": {
      title: "In Progress",
      items: [item6]
    },
    done: {
      title: "Done",
      items: []
    }
  });

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) {
      return;
    }

    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }

    // Creating a copy of item before removing it from state
    const itemCopy = { ...state[source.droppableId].items[source.index] };

    setState((prev) => {
      prev = { ...prev };
      // Remove from previous items array
      prev[source.droppableId].items.splice(source.index, 1);

      // Adding to new items array location
      prev[destination.droppableId].items.splice(
        destination.index,
        0,
        itemCopy
      );

      return prev;
    });
  };

  const onAddItem = (e) => {
    e.preventDefault();
    setState((prev) => {
      return {
        ...prev,
        todo: {
          title: "Todo",
          items: [
            {
              id: v4(),
              name: text,
              desc: description,
              startDate: date,
              endDate: endDate,
              time: time
            },
            ...prev.todo.items
          ]
        }
      };
    });
  };

  return (
    <>
      <div className="App">
        <form className="form-container" onSubmit={onAddItem}>
          <h1>Add New Item</h1>
          <div className="upper-section">
            <div className="label-and-input-container">
              <label className="label" htmlFor="text">
                Item name
              </label>
              <input
                className="input"
                id="text"
                type="text"
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <div className="label-and-input-container">
              <label className="label" htmlFor="file">
                Attachment
              </label>
              <input className="input" id="file" type="file" />
            </div>
            <div className="label-and-input-container">
              <label className="label" htmlFor="file">
                Description
              </label>
              <input
                className="input"
                id="description"
                type="texarea"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <h2>default Section </h2>
          <hr />
          <div className="label-and-input-container">
            <label className="label" htmlFor="select">
              Status
            </label>
            <select className="input" id="select">
              <option value="Todo">Todo</option>
              <option value="Planning">Planning</option>
              <option value="QA Raised Bugs">QA Raised Bugs</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div className="label-and-input-container">
            <label className="label" htmlFor="startDate">
              Start Date
            </label>
            <input
              className="input"
              id="startDate"
              type="date"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="label-and-input-container">
            <label className="label" htmlFor="endDate">
              End Date
            </label>
            <input
              className="input"
              id="endDate"
              type="date"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="label-and-input-container">
            <label className="label" htmlFor="time">
              Duration
            </label>
            <input
              className="input"
              id="time"
              type="time"
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <button className="button" type="submit">
            create
          </button>
        </form>
        <div className={"card"}>
          <DragDropContext onDragEnd={handleDragEnd}>
            {_.map(state, (data, key) => {
              return (
                <div key={key} className={"column"}>
                  <h3>{data.title}</h3>

                  <Droppable droppableId={key}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={"dropable-col"}
                        >
                          {data.items.map((el, index) => {
                            return (
                              <Draggable
                                key={el.id}
                                index={index}
                                draggableId={el.id}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      className={`item ${
                                        snapshot.isDragging && "dragging"
                                      }`}
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      {el.name}
                                      <p className="desc">{el.description}</p>
                                      <p className="date">
                                        Start-Date: {el.startDate} <br />{" "}
                                        End-Date:
                                        {el.endDate}
                                      </p>
                                      <p>Duration : {el.time} </p>
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              );
            })}
          </DragDropContext>
        </div>
      </div>
      <footer className="footer-text">
        <p>
          Made by{" "}
          <a href="www.linkedin.com/in/jeevan-barma-87a2b9197" target="_blank">
            Jeevan Barma
          </a>
        </p>
      </footer>
    </>
  );
}
export default App;

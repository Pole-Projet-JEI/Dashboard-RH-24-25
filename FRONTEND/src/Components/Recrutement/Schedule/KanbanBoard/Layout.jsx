import { colors, Grid } from "@mui/material";
import InterviewStatus from "./InterviewStatus";
import RecruitementInterviewCard from "./RecruitementInterviewCard";
import InterviewsData from './KanbanBoardData.json'
import { useState } from "react";

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import KanbanForm from "../../../kanbanForm";
import ScheduleButton from "../../../ScheduleButton";
import { statuses } from "../../interview-states";

export default function Layout() {

    function sortByStatus(columns, items) {
        const updatedColumns = { ...columns };
        items.forEach(interview => {
            const status = interview.Status.toUpperCase();
            if (updatedColumns[status]) {
                updatedColumns[status].items.push(interview);
            } else {
                console.error(`Unknown status: ${status}`);
            }
        });
        return updatedColumns;
    }
    
    const items = InterviewsData; //fetch interview
    
    const columns = {
        [statuses.CONFIRMED.id]: {
            id: statuses.CONFIRMED.id,
            items: []
        },
        [statuses.DELAYED.id]: {
            id: statuses.DELAYED.id,
            items: []
        },
        [statuses.CANCELLED.id]: {
            id: statuses.CANCELLED.id,
            items: []
        }
    };
    console.log(columns)
    sortByStatus(columns,items);
    
    const [boardColumns, setBoardColumns] = useState(columns);
    const [showFormInColumn, setShowFormInColumn] = useState(null); // Track which column shows the form
    

    function getFormData(formData) {
        console.log('Form data:', formData);
        
        // Add new interview to the appropriate column
        const updatedColumns = { ...boardColumns };
        
        const newInterview = {
            id: "10",
            Interviewee: formData.interviewWith,
            Date: formData.date, // assuming date is part of the formData
            Time: formData.time, // assuming time is part of the formData
            Interviewer: formData.interviewedBy,
            Department: formData.department,
            Status: showFormInColumn // Use showFormInColumn to determine status
        };

        // Add new interview to the column with the status matching `showFormInColumn`
        updatedColumns[showFormInColumn] = {
            ...updatedColumns[showFormInColumn],
            items: [...updatedColumns[showFormInColumn].items, newInterview]
        };

        setBoardColumns(updatedColumns);
        setShowFormInColumn(null); // Hide form after submission
    }


    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        const { source, destination } = result;
    
        // Helper function to get a column by id
        const getColumnById = (id) => boardColumns[id];
    
        if (source.droppableId !== destination.droppableId) {
            // Moving between columns
            const sourceColumn = getColumnById(source.droppableId);
            const destColumn = getColumnById(destination.droppableId);
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
    
            // Update the status of the dragged item
            const updatedItem = {
                ...removed,
                Status: destination.droppableId, // Update status to match destination column
            };
    
            destItems.splice(destination.index, 0, updatedItem);
    
            setBoardColumns({
                ...boardColumns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems,
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems,
                },
            });
        } else {
            // Moving within the same column
            const column = getColumnById(source.droppableId);
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
    
            setBoardColumns({
                ...boardColumns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems,
                },
            });
        }
        console.log(boardColumns)
    };

    

    const handleAddInterviewClick = (columnId) => {
        setShowFormInColumn(showFormInColumn === columnId ? null : columnId); // Toggle form visibility
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Grid container xs={12} sx={{ overflow: 'auto', minWidth: 835 }} spacing={2}>
                {Object.entries(boardColumns).map(([id, column]) => (
                    <Droppable droppableId={id} key={id}>
                        {(provided, snapshot) => (
                            <Grid
                                item
                                xs={4}
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                <InterviewStatus columnId={id} columnLength={column.items.length} />
                                {column.items.map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={{
                                                    userSelect: 'none',
                                                    ...provided.draggableProps.style,
                                                }}
                                            >
                                                <RecruitementInterviewCard interview={item} />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {showFormInColumn === id && <KanbanForm  getFormData={getFormData}/>}
                                <ScheduleButton
                                    schedule="Add Interview"
                                    variant="outlined"
                                    sx={{
                                        width: '100%',
                                        justifyContent: 'start',
                                        paddingBlock: 1,
                                        color: 'text.primary',
                                        borderColor: 'neutral.light',
                                    }}
                                    onClick={() => handleAddInterviewClick(id)}
                                />
                            </Grid>
                        )}
                    </Droppable>
                ))}
            </Grid>
        </DragDropContext>
    );
}

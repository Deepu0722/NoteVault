import {useState} from 'react';
import './App.css';

function App() {
// Define the Note interface
interface Note {
  id: number;
  title: string;
  content: string;
}
  const[notes, setNotes] = useState([
    {
      id: 1,
      title: "Note Title 1",
      content: "Content 1 ",
    },
    {
      id: 2,
      title: "Note Title 2",
      content: "Content 2 ",
    },
    {
      id: 3,
      title: "Note Title 3",
      content: "Content 3 ",
    },
    {
      id: 4,
      title: "Note Title 4",
      content: "Content 4",
    },
    {
      id: 5,
      title: "Note Title 5",
      content: "Content 5",
    }
  ]);

  const[title, setTitle] = useState("");

  const[content, setContent] = useState("");

  const handleAddNewNote = (event: React.FormEvent)=>{
    event.preventDefault();
    console.log("title:", title);
    console.log("content:", content);

    //create new note:
    const newNote: Note = {
      id: notes.length + 1,
      title: title,
      content: content,
    }
    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
  }
  const[selectedNote, setSelectedNote] = useState<Note | null>(null);
  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  }
  const handleCancelClick = () => {
    setSelectedNote(null);
    setContent("");
    setTitle("");
  }
  const handleUpdateNote = (event: React.FormEvent) => {
    event.preventDefault();
    if(!selectedNote){
      return;
    }
    const updatedNote: Note = {
      id: selectedNote.id,
      content: content,
      title: title,
    }
    const updatedNoteList = notes.map((note) => 
      note.id === selectedNote.id 
      ? updatedNote
      : note 
    );

    setNotes(updatedNoteList);
    setTitle("");
    setContent("");
    setSelectedNote(null);

  }
  const deleteNote = (event: React.MouseEvent, noteId: number) => {
    event.stopPropagation();
    const updatedNoteList = notes.filter((note)=> note.id !== noteId);
    setNotes(updatedNoteList);
    setTitle("");
    setContent("");
    setSelectedNote(null);

  }

  return (
    <div className="app-container">
     <form  className="note-form"
     onSubmit={(event) => selectedNote ? handleUpdateNote(event): handleAddNewNote(event)}>
      <input type="text" name="" id=""
      value={title}
      onChange={(event) => setTitle(event.target.value)}
      placeholder='Enter Title Note ..' required />
      <textarea name="" id="" 
      value={content}
      onChange={(event)=> setContent(event.target.value)}
      placeholder="Please enter your content here!!" rows={10} required ></textarea>
    
      {selectedNote? (
        <div className='note-edit-buttons'>
          <button type="submit"> Save </button>
          <button onClick={handleCancelClick}> Cancel</button>
        </div>
      ): (
          <button type="submit" > Add Note </button>
      )}

     </form>
     <div className='notes-grid'>
      {notes.map((note)=> (
               <div key={note.id}
               className='note-item'
               onClick={()=>{handleNoteClick(note)}}>
               <div className='note-header'>
                 <button onClick={(event)=>deleteNote(event, note.id)}>X</button>
               </div>
               <h2>{note.title}</h2>
               <p>{note.content}</p>
             </div>
      ))}
     </div>
    </div>
  );
}

export default App;

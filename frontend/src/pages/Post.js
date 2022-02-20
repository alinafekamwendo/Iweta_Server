import React, { useEffect, useState, useContext } from "react";
import {  Delete } from "@material-ui/icons";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import { makeStyles } from '@material-ui/core/styles';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import UserComment from '../image/commentUser.jpg'
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  height: '300px',
  color: theme.palette.text.secondary,
}));


function Post() {
  const classes = useStyles();
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { authState } = useContext(AuthContext);

  let navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });

    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, []);

  const addComment = () => {
    axios
      .post(
        "http://localhost:3001/comments",
        {
          commentBody: newComment,
          PostId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          const commentToAdd = {
            commentBody: newComment,
            username: response.data.username,
          };
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      });
  };

  const deleteComment = (id) => {
    axios
      .delete(`http://localhost:3001/comments/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        setComments(
          comments.filter((val) => {
            return val.id != id;
          })
        );
      });
  };

  const deletePost = (id) => {
    axios
      .delete(`http://localhost:3001/posts/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        navigate("/forum");
      });
  };
  return (
    <div className="postPage">
      <div className="postlayout">
    <Box sx={{ width: '100%' }}>
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={10}>
        <Item>
        <div className="" id="individual">
          <div className="title"> {postObject.title} </div>
          <div className="">{postObject.postText}</div>
          
         

          <div className="addCommentContainer">
          <input 
            type="text"
            placeholder="Comment..."
            autoComplete="off"
            value={newComment}
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          />


<Button variant="contained"  onClick={addComment} className={classes.root}> Add Comment </Button>
           
        </div>
         </div>
        </Item>
      </Grid>
      <Grid item xs={2}>
        <Item>
        <p>Posted by:</p> <h3>{postObject.username} </h3>
        <div className="">
          
            {authState.username === postObject.username && (
              <Delete className="deletePosterscomment"
                onClick={() => {
                  deletePost(postObject.id);
                }}
              >
                {" "}
              </Delete>
            )}
            <p>Delete Main Post</p>
          </div>
        </Item>
      </Grid>
    </Grid>
    <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div key={key} className="comment">
                {comment.commentBody}
                
                {authState.username === comment.username && (
                  <Delete className="deletePersonalcomment"
                    onClick={() => {
                      deleteComment(comment.id);
                    }}
                  >
                  
                  </Delete>
                )}
                <br/>
                <br/>
                 <label style={{color: "#002178"}}>
                   
 <img src={UserComment} alt="User who commented" style={{ height: "1%", width: "4%"}}/>
          
                    {comment.username}</label>
              </div>
            );
          })}
        </div>
  </Box>
  </div>
  </div>
  );
}
export default Post;

import React, { useState, useEffect, useRef } from 'react';
import { Card, Input, Flex, Box, Link, Text } from 'theme-ui';
import { useDebounce } from 'use-debounce';
import EditToolbar from './EditToolbar';
import { updatePage } from '../lib/updatePage';
import isUrl from 'is-url';
import TextareaAutosize from 'react-textarea-autosize';

const DEBOUNCE_MS = 700;

const LinkBlock = (props) => {
  const signedIn = props.signedIn;
  const [editing, setEditing] = useState(false);
  const content = props.data ? props.data[props.id] : null;
  const initialText = content ? (content.text as string) : '';
  const initialUrl = content ? (content.url as string) : '';
  const initialComment = content ? (content.comment as string) : '';
  const [text, setText] = useState<string>(initialText);
  const [url, setUrl] = useState<string>(initialUrl);
  const [comment, setComment] = useState<string>(initialComment);
  const [debouncedText] = useDebounce(text, DEBOUNCE_MS);
  const [debouncedUrl] = useDebounce(url, DEBOUNCE_MS);
  const [debouncedComment] = useDebounce(comment, DEBOUNCE_MS);

  useEffect(() => {
    if (isUrl(debouncedUrl) && text.length > 0) {
      const value = {
        url: debouncedUrl,
        text: debouncedText,
        comment: debouncedComment,
      };
      syncUpdates(value);
    }
  }, [debouncedText, debouncedUrl, debouncedComment]);

  const syncUpdates = async function (value) {
    try {
      await updatePage(props.uploadUrl, props.data, props.id, value);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Card variant="block" sx={{ border: 'solid 1px black', fontSize: '16px', bg: 'white' }}>
      <>
        <Flex
          onClick={() => {
            if (content && props.previewing) {
              window.location.assign(content.url as string);
            } else {
              setEditing(true);
            }
          }}
          sx={{
            py: 0,
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 8,
            color: 'black',
            cursor: 'pointer',
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            {editing && (
              <Input
                variant="linkInput"
                sx={{ py: 2, px: 3 }}
                defaultValue={text}
                placeholder="Link text"
                onChange={(t) => {
                  setText(t.target.value);
                }}
              />
            )}
            {!editing && (
              <Box sx={{ py: 2, px: 3 }}>
                <Link href={url} variant="block">
                  {text}
                </Link>
              </Box>
            )}
          </Box>
        </Flex>
      </>
      {((!props.previewing && (editing || (!editing && comment && comment.length > 0))) ||
        (props.previewing && comment && comment.length > 0)) && (
        <Flex
          sx={{ bg: 'lightGray', borderRadius: '0px 0px 8px 8px' }}
          onClick={() => {
            if (!props.previewing) {
              setEditing(true);
            }
          }}
        >
          {editing && (
            <TextareaAutosize
              defaultValue={comment}
              spellCheck={false}
              style={{
                textAlign: 'right',
                background: 'transparent',
                width: '100%',
                resize: 'none',
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                fontSize: '13px',
                border: 'none',
                paddingLeft: 8,
                paddingRight: 8,
                paddingTop: 8,
                paddingBottom: 8,
                overflow: 'hidden',
                pointerEvents: props.previewing ? 'none' : 'auto',
              }}
              placeholder="Comment (optional)"
              onChange={(t) => {
                setComment(t.target.value);
              }}
            />
          )}
          {!editing && (
            <Text sx={{ textAlign: 'right', width: '100%', fontSize: '13px', px: 2, py: 2 }}>{comment}</Text>
          )}
        </Flex>
      )}
      {editing && !props.previewing && (
        <Box
          sx={{
            mt: 1,
            background: 'linear-gradient(-45deg, #e6fffa, #faf5ff, #ebf8ff)',
            backgroundSize: '400% 400%',
            animation: 'gradient 10s ease infinite',
          }}
        >
          <Input
            type="url"
            variant="linkInput"
            defaultValue={url}
            placeholder="Link address"
            sx={{
              py: 2,
              px: 3,
              fontSize: '14px',
              fontFamily: 'mono',
            }}
            onChange={(e) => {
              const val = e.target.value;
              if (isUrl(val)) {
                setUrl(val);
              }
            }}
          ></Input>
        </Box>
      )}
      {signedIn && !props.previewing && (
        <EditToolbar
          editing={editing}
          onDelete={props.onDelete}
          hideDown={props.hideDown}
          hideUp={props.hideUp}
          onUp={props.onUp}
          onDown={props.onDown}
          onSwitchEditing={() => {
            setEditing(!editing);
          }}
        />
      )}
    </Card>
  );
};
export default LinkBlock;

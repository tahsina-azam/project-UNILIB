import { createContext, useContext, useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOK_LIST_QUERY } from "../database/queries";

const FileContext = createContext({
  files: [],
});

const FileProvider = ({ children }) => {
  const { data, loading, error } = useQuery(GET_BOOK_LIST_QUERY);

  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (data && data.BookLinks) {
      console.log(data.BookLinks);
      setFiles(data.BookLinks);
    } else setFiles([]);
  }, [data]);

  return (
    <FileContext.Provider value={{ files, loading, error }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFiles = () => {
  return useContext(FileContext);
};

export default FileProvider;

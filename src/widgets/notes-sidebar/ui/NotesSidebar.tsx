import { CreateNote } from "@/feature/create-note";
import { NoteList } from "@/feature/note-list";
import { Flex } from "antd";
import Sider from "antd/es/layout/Sider";
import "./NotesSidebar.scss";

export const NotesSidebar = () => {
  return (
    <Sider className="notes-sidebar ios-scrollbar">
      <Flex
        vertical
        justify="space-between"
        gap="middle"
        className="notes-sidebar__inner"
      >
        <div className="notes-sidebar__list ios-scrollbar">
          <NoteList />
        </div>
        <CreateNote />
      </Flex>
    </Sider>
  );
};

import { CreateNote } from "@/feature/create-note";
import { NoteList } from "@/feature/note-list";
import { SearchBox } from "@/feature/search";
import { Flex } from "antd";
import Sider from "antd/es/layout/Sider";
import "./Sidebar.scss";

export function Sidebar() {
  return (
    <Sider className="notes-sidebar ios-scrollbar" width={320}>
      <Flex
        vertical
        justify="space-between"
        gap="middle"
        className="notes-sidebar__inner"
      >
        <div className="notes-sidebar__top">
          <SearchBox />
          <div className="notes-sidebar__list ios-scrollbar">
            <NoteList />
          </div>
        </div>
        <CreateNote />
      </Flex>
    </Sider>
  );
}

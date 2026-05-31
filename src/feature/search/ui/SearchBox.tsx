import { useNotesUi } from "@/app/providers/NotesUiProvider";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import "./SearchBox.scss";

export function SearchBox() {
  const { searchQuery, setSearchQuery } = useNotesUi();

  return (
    <div className="search-box">
      <Input
        allowClear
        size="large"
        prefix={<SearchOutlined />}
        placeholder="Поиск"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-box__input"
      />
    </div>
  );
}

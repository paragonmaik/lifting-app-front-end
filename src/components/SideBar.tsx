import useProgram from 'hooks/useProgram';
import ProgramModal from './ProgramModal';
import useScreenSize from 'hooks/useScreenSize';
import toolsIcon from '../../public/tools-svgrepo-com.svg';
import addIcon from '../../public/add-circle-svgrepo-com.svg';
import dumbbellIcon from '../../public/dumbbell-svgrepo-com.svg';
import profileIcon from '../../public/profile-round-1346-svgrepo-com.svg';
import programsIcon from '../../public/list-ul-alt-svgrepo-com.svg';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useContext, useEffect, useState } from 'react';
import { Program } from 'types';
import { Context } from 'context/Context';

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);
  const { data: programs } = useProgram();
  const { setCurProgramPos } = useContext(Context);
  const [screenSize, _setScreenSize] = useScreenSize();

  useEffect(() => {
    if (shouldCollapse()) setCollapsed(true);
  }, [shouldCollapse()]);

  function shouldCollapse(): boolean {
    return screenSize.width < 800;
  }

  function collapseSidebar(): void {
    if (shouldCollapse()) {
      setCollapsed(collapsed);
    } else {
      setCollapsed(!collapsed);
    }
  }

  return (
    <div className="h-100">
      <Sidebar className="h-100" collapsed={collapsed}>
        <Menu>
          <MenuItem onClick={() => collapseSidebar()}>
            {collapsed ? <img width={32} src={dumbbellIcon} /> : 'Hide Sidebar'}
          </MenuItem>
          <MenuItem>
            {collapsed ? <img width={32} src={profileIcon} /> : 'Programs'}
          </MenuItem>
          <ProgramModal
            addBtn={
              collapsed ? <img width={32} src={addIcon} /> : 'Add Program'
            }
            isAdd={true}
          />
          <SubMenu
            label={
              collapsed ? <img width={32} src={programsIcon} /> : 'Programs'
            }
          >
            {programs?.map((program: Program, i) => (
              <MenuItem onClick={() => setCurProgramPos(i)} key={program.id}>
                {program.name}
              </MenuItem>
            ))}
          </SubMenu>
          <SubMenu
            label={collapsed ? <img width={32} src={toolsIcon}></img> : 'Tools'}
          >
            <MenuItem>Timer</MenuItem>
            <MenuItem>ORM Calculator</MenuItem>
            <MenuItem>FFMI Calculator</MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
    </div>
  );
}

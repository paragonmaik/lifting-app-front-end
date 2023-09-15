import useProgram from 'hooks/useProgram';
import ProgramModal from './ProgramModal';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Program } from 'types';
import { useContext, useState } from 'react';
import { Context } from 'context/Context';

export default function SideBar() {
  const [show, setShow] = useState(false);
  const { data: programs } = useProgram();
  const { setCurProgramPos } = useContext(Context);

  return (
    <div className="h-100">
      <Sidebar className="h-100" collapsed={show}>
        <Menu>
          <MenuItem onClick={() => setShow(!show)}>
            <div className="d-flex">
              Logo placeholder<div>Collapse Placeholder</div>
            </div>
          </MenuItem>
          <MenuItem>Profile</MenuItem>
          <ProgramModal isAdd={true} />
          <SubMenu label="Programs">
            {programs?.map((program: Program, i) => (
              <MenuItem onClick={() => setCurProgramPos(i)} key={program.id}>
                {program.name}
              </MenuItem>
            ))}
          </SubMenu>
          <SubMenu label="Tools">
            <MenuItem>Timer</MenuItem>
            <MenuItem>ORM Calculator</MenuItem>
            <MenuItem>FFMI Calculator</MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
    </div>
  );
}

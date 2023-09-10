import useProgram from 'hooks/useProgram';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Program } from 'types';
import { useContext } from 'react';
import { Context } from 'context/Context';

export default function SideBar() {
  const { data: programs } = useProgram();
  const { setCurProgramPos } = useContext(Context);

  return (
    <div className="h-100">
      <Sidebar className="h-100" collapsed={false}>
        <Menu>
          <SubMenu label="Programs">
            <MenuItem>Add Program</MenuItem>
            {programs?.map((program: Program, i) => (
              <MenuItem onClick={() => setCurProgramPos(i)} key={program.id}>
                {program.name}
              </MenuItem>
            ))}
          </SubMenu>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Tools</MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
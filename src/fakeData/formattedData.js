import projects from './project.json';
import users from './user.json';
import devices from './device.json';

export const formatedData = () => {
  const data = projects.reduce((acc, curr, i) => {
    let projectDevices = devices.filter(el => el.projectId === curr.id);
    let projectUsers = users.filter(el => el.projectId === curr.id);
    let formatedBeginDate = curr.beginDate ? new Date(curr.beginDate).toLocaleString() : curr.beginDate;
    let formatedExpirationDate = curr.expirationDate ? new Date(curr.expirationDate).toLocaleString() : curr.expirationDate;

    acc[i] = curr;
    acc[i].beginDate = formatedBeginDate;
    acc[i].expirationDate = formatedExpirationDate;
    acc[i]['devices'] = projectDevices;
    acc[i]['users'] = projectUsers;

    return acc;
  }, []);

  return data;
};

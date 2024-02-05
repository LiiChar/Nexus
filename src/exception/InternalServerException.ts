import HttpException from './HttpException';

class ProjectNotFoundException extends HttpException {
	constructor() {
		super(500, `Internal Server Error`);
	}
}

export default ProjectNotFoundException;

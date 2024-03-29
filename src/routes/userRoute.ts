import { Router } from 'express';
import userController from '../controllers/userController';
import authorization from '../middlewares/authorization';
import { registerDefinition } from 'swaggiffy';

class userRouter {
    private _router = Router();
    private _controller = userController;
    private _auth = authorization.verifyToken;

    get router() {
        return this._router;
    }

    constructor() {
        this._configure();
    }

    private _configure() {
        this._router.get('/', this._auth, this._controller.getUsers);
        this._router.get('/auth/:token',this._controller.authorize);
        this._router.get('/:id', this._auth, this._controller.getUser);
        this.router.get('/google/:id', this._auth, this._controller.getUserByGoogleId);
        this.router.post('/newUser/google', this._controller.registerWithGoogle);
        this.router.post('/login/google', this._controller.loginGoogle);
        this._router.post('/newUser', this._controller.createUser);
        this._router.post('/login', this._controller.login);
        this._router.put('/:id', this._auth, this._controller.updateUser);
        this._router.delete('/:id', this._auth, this._controller.deleteUser);
    }
}

registerDefinition(new userRouter().router, { tags: 'Users', mappedSchema: 'Users', basePath: '/user' });

export = new userRouter().router;

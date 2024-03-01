import { Router } from "express";
import { check } from "express-validator";
import {
    userPost,
    getUsers,
    updateUser
} from "./user.controller.js";
import {
    existeUsuarioById,
    existenteEmail,
} from "../helpers/db-validators.js";
import { validarCampos } from "../middlewares/validar-campos.js";


const router = Router();

router.get("/", getUsers);

router.post(
    "/",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("password", "El password debe ser mayor a 6 caracteres").isLength({
            min: 6,
        }),
        check("correo", "Este no es un correo válido").isEmail(),
        check("correo").custom(existenteEmail),
        validarCampos,
    ],
    userPost 
);

router.put(
    "/:id",
    [
        check("id", "This is not a valid ID").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos,
    ],
    updateUser

);


export default router;
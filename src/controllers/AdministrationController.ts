import { inject, injectable }         from "inversify";
import { Request, Response }          from "express";
import { TYPES }                      from "../types";
import { IAdministrationController }  from "./IAdministrationController";
import { User }                       from "../models";
import { IAdministrationService }     from "../services";
import { GetUsersRequestDTO,
    GetUsersResponseDTO,
    ManagedUserDTO,
    UpdateUserAccountStatusDTO }      from "../dtos";

@injectable()
export class AdministrationController implements IAdministrationController {

    private readonly _administrationService: IAdministrationService;

    constructor(@inject(TYPES.AdministrationService) administrationService: IAdministrationService) {
        this._administrationService = administrationService;
    }

    public async getUsers(request: Request, response: Response): Promise<void> {
        const searchTerm: string        = request.query.searchTerm;
        const sortOrientation: string   = request.query.sortOrientation;
        const sortCriterion: string     = request.query.sortCriterion;
        const page: number              = request.query.page;
        const pageSize: number          = request.query.pageSize;

        this._administrationService.setLocale(request.Locale);

        const getUsersRequest: GetUsersRequestDTO =
            new GetUsersRequestDTO(request.Principal.Email, searchTerm, sortOrientation, sortCriterion, page, pageSize);

        const getUsersResponse: GetUsersResponseDTO
                    = await this._administrationService.getUsers(getUsersRequest);

        response.send(getUsersResponse);
    }

    public async inviteUser(request: Request, response: Response): Promise<void> {
        const user: ManagedUserDTO = request.body as ManagedUserDTO;

        this._administrationService.setLocale(request.Locale);

        const invitedUser: User = await this._administrationService.inviteUser(request.Principal.Email, user);

        response.send(invitedUser);
    }

    public async enableUser(request: Request, response: Response): Promise<void> {
        const updateUserAccountStatusDTO: UpdateUserAccountStatusDTO = request.body as UpdateUserAccountStatusDTO;

        this._administrationService.setLocale(request.Locale);

        await this._administrationService.enableUser(request.Principal.Email, request.params.userID, updateUserAccountStatusDTO);

        response.sendStatus(200);
    }

    public async disableUser(request: Request, response: Response): Promise<void> {
        const updateUserAccountStatusDTO: UpdateUserAccountStatusDTO = request.body as UpdateUserAccountStatusDTO;

        this._administrationService.setLocale(request.Locale);

        await this._administrationService.disableUser(request.Principal.Email, request.params.userID, updateUserAccountStatusDTO);

        response.sendStatus(200);
    }

    public async deleteUser(request: Request, response: Response): Promise<void> {
        const updateUserAccountStatusDTO: UpdateUserAccountStatusDTO = request.body as UpdateUserAccountStatusDTO;

        this._administrationService.setLocale(request.Locale);

        await this._administrationService.deleteUser(request.Principal.Email, request.params.userID, updateUserAccountStatusDTO);

        response.sendStatus(200);
    }

}
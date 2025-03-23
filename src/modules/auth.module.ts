import { checkUserCredentials, InitializeNewUser } from '@/services/auth/auth.service';
import { checkInvitation, getAllInvitationUser } from '@/services/user/invitationUser.service';
import { createWorkspaceWithPerm } from '@/modules/workspace.module';
import { getWorkspaceIdByUserId } from '@/services/workspace/workspace.service';


export async function signInUserWithPerm(email: string, password: string) {
    const user = await checkUserCredentials(email, password)
    return getWorkspaceIdByUserId(user.id)
}

export async function signUpUserWithPerm(email: string, password: string) {
    const newUser = await InitializeNewUser(email, password);

    const invitationsUser = await getAllInvitationUser(newUser.email)
    await checkInvitation(invitationsUser, newUser)

    return await createWorkspaceWithPerm(newUser.name, true, newUser.id);
}

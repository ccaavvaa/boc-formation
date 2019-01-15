import * as boc from '@phoenix/boc';
import { ProjectView } from '../../views/project/ProjectView';
import { Project } from '../../models/Project';
import { ProjectMember } from '../../models/ProjectMember';
import { ProjectMemberView } from '../../views/project/ProjectMemberView';
export class ProjectViewRules {
    @boc.ObjectInit({
        constr: ProjectView,
    })
    public static async init(target: ProjectView, msg: boc.Message) {
        const c = target.container;
        if (!target.model) {
            let project: Project;
            if (msg.data) {
                let hasParams = false;
                if (msg.data.code) {
                    hasParams = true;
                    project = await c.getOne<Project>(Project, { code: msg.data.code });
                } else if (msg.data.refProject) {
                    hasParams = true;
                    project = c.getInMemByRef<Project>(msg.data.refProject);
                } else if (msg.data.idProject) {
                    hasParams = true;
                    project = await c.getOne<Project>(Project, { id: msg.data.idProject });
                }
                if (hasParams && !project) {
                    throw new boc.BOErr(500, c.t('Projet non trouvé'));
                }
            }
            if (!project) {
                project = await c.createNew<Project>(Project);
                await target.set_model(project);
            }
        }
    }
    // @boc.ModelChanged({
    //     constr: ProjectView,
    // })
    // public static async initSyncho(target: ProjectView, msg: boc.Message) {
    //     let membersSync: boc.RelationSynchronizer<
    //         Project, ProjectMember, ProjectView, ProjectMemberView>
    //         = target.mappings.membersSync;
    //     if (membersSync) {
    //         await membersSync.set_Source(null);
    //         for (const member of await target.members.toArray()) {
    //             await target.members.unlink(member);
    //         }
    //     } else {
    //         membersSync = new boc.RelationSynchronizer<
    //             Project, ProjectMember, ProjectView, ProjectMemberView>();
    //         target.mappings.membersSync = membersSync;
    //     }
    //     await membersSync.set_Source(target.model.members);
    //     await membersSync.set_Destination(target.members);
    // }
    @boc.Action({
        constr: ProjectView,
        actionId: 'members.$new'
    })
    public static async addNewMember(target: ProjectView, msg: boc.Message) {
        const c = target.container;
        const member = await c.createNew<ProjectMember>(ProjectMember);
        await target.model.members.link(member);
    }
    @boc.Action({
        constr: ProjectView,
        actionId: 'members.$remove'
    })
    public static async removeMember(target: ProjectView, msg: boc.Message) {
        const ids: number[] = msg.data && Array.isArray(msg.data) ? msg.data : [];
        if (ids.length) {
            const curentMembersViews = await target.members.toArray();
            const membersToRemove = curentMembersViews
                .filter((m) => ids.indexOf(m.id) >= 0)
                .map((m) => m.model);
            for (const member of membersToRemove) {
                await member.toDelete();
            }
        }
    }
}

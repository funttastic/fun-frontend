import {Status} from "@/model/enum/status";

export async function getStatus() {
    await new Promise(resolve => setTimeout(resolve, 5000));

    const statuses = Status.list.toJS()

    return statuses[Math.floor(Math.random() * statuses.length)].id
}

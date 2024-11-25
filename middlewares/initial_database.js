import roleModel from "../models/role_models.js";
import uomModel from "../models/uom_models.js";

export const addRolesInitially = async () => {
    const roles = [
        { name: "admin" },
        { name: "operator" },
        { name: "owner" },
    ];

    for (const role of roles) {
        try {
            const [roleRecord, created] = await roleModel.findOrCreate({
                where: { name: role.name },
                defaults: {
                    name: role.name,
                },
            });
        } catch (error) {
            console.error(`Error adding role '${role.name}':`, error.message);
        }
    }
};



export const addUomsInitially = async () => {
    const uoms = [
        { uomname: "Kg" },
        { uomname: "Ltr" },
    ];
    for (const uom of uoms) {
        try {
            const [uomRecord, created] = await uomModel.findOrCreate({
                where: { uomname: uom.uomname },
            });
        } catch (error) {
            console.error(`Error seeding UOM '${uom.uomname}':`, error.message);
        }
    }
};

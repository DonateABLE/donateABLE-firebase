import Button from "components/button";
import Content from "components/content";
import { Input } from "components/form";
import Header from "components/header";
import { PageLoader } from "components/loader";
import { showToast } from "components/snack-bar";
import { storage, useUser } from "fb";
import { imageSelect } from "image-select";
import User from "orm/user";
import {
    ChangeEvent,
    createElement,
    FunctionComponent,
    useCallback,
    useRef,
    useState,
    useEffect,
} from "react";
import { addValue, bindArgs, classNames, useForceUpdate } from "utils";
import { v4 as uuidv4 } from "uuid";
import noUser from "../../assets/user.svg";
import styles from "./style.scss";
import { TabContainer, Tab } from "components/tabs";
import UserStatistics from "components/user-stats";
import UserCharityRank from "components/user-charity";
import Charity from "orm/charity";
import { analytics } from "firebase";
import { useQuery } from "orm/model";

const userToastKey = Symbol("user-toast-key");

const UserEdit: FunctionComponent = (props) => {
    const charities = useQuery(Charity.builder().orderBy("longName")) ?? [];
    const user = useUser();
    const forceUpdate = useForceUpdate();

    const changeUser = useCallback(
        (
            field: Diff<FilterPropertyNames<User, string>, "fullName">,
            value: string
        ) => {
            if (user) {
                user[field] = value;
                forceUpdate();
            }
        },
        [user, forceUpdate]
    );

    const save = useCallback(async () => {
        if (user) {
            await user.save();
            alert("User saved");
        }
    }, [user]);

    const [imageUploading, changeImageUploading] = useState(false);

    const imageClick = useCallback(async () => {
        const file = await imageSelect();
        if (file && user) {
            user.portrait = URL.createObjectURL(file);
            changeImageUploading(true);

            const url = `logo/${uuidv4()}`;
            await storage.child(url).put(file);

            const publicURL = await storage.child(url).getDownloadURL();
            user.portrait = publicURL;
            changeImageUploading(false);
            await user.save();
        }
    }, [user, changeImageUploading]);
    if (!user) {
        return <PageLoader />;
    }
    return (
        <Content>
            <Header
                image={user.portrait ?? noUser}
                imageAlt="User portrait"
                imageRound
                onImageClick={imageClick}
                imageClassName={classNames(styles.image, {
                    [styles.imageUploading]: imageUploading,
                })}
                title={user.fullName} //{user.fullName}
                subtitle={user.email} //{user.email}
                buttonTitle="Start Donating"
                buttonLocation="/"
            />
            <div className={styles.tabBar}>
                <TabContainer>
                    <Tab title={"Account Settings"}>
                        <div className={styles.form}>
                            {/* <input ref={fileRef} type='file' onChange={imageChange} /> */}
                            <Input
                                className={styles.firstName}
                                title="First Name"
                                value={user.firstName}
                                onChange={addValue(
                                    bindArgs("firstName", changeUser)
                                )}
                            />

                            <Input
                                className={styles.lastName}
                                title="Last Name"
                                value={user.lastName}
                                onChange={addValue(
                                    bindArgs("lastName", changeUser)
                                )}
                            />

                            <Input
                                className={styles.email}
                                title="Email Address"
                                value={user.email}
                                onChange={addValue(
                                    bindArgs("email", changeUser)
                                )}
                            />

                            <Input
                                className={styles.user}
                                title="Username"
                                value={user.user}
                                onChange={addValue(
                                    bindArgs("user", changeUser)
                                )}
                            />
                        </div>
                        <Button
                            className={styles.button}
                            fullWidth
                            onClick={save}
                        >
                            Save
                        </Button>
                    </Tab>
                    <Tab title={"Top Charities"}>
                        <div className={styles.topCharities}>
                            <UserCharityRank rank={1} charity={charities[0]} />
                            <UserCharityRank rank={2} charity={charities[1]} />
                            <UserCharityRank rank={3} charity={charities[2]} />
                        </div>
                    </Tab>
                    <Tab title={"Your Statistics"}>
                        <UserStatistics user={user} />
                    </Tab>
                </TabContainer>
            </div>
        </Content>
    );
};

export default UserEdit;

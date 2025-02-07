import React, { useState, useEffect } from 'react';
import Menu from '@/components/ui/Menu';
import AuthorityCheck from '@/components/shared/AuthorityCheck';
import VerticalSingleMenuItem from './VerticalSingleMenuItem';
import VerticalCollapsedMenuItem from './VerticalCollapsedMenuItem';
import { themeConfig } from '@/configs/theme.config';
import {
  NAV_ITEM_TYPE_TITLE,
  NAV_ITEM_TYPE_COLLAPSE,
  NAV_ITEM_TYPE_ITEM,
} from '@/constants/navigation.constant';
import useMenuActive from '@/utils/hooks/useMenuActive';
import { useTranslation } from 'react-i18next';
import { Direction, NavMode } from '@/@types/theme';
import type { NavigationTree } from '@/@types/navigation';

export interface VerticalMenuContentProps {
  navMode: NavMode;
  collapsed?: boolean;
  routeKey: string;
  navigationTree?: NavigationTree[];
  userAuthority: string[];
  onMenuItemClick?: () => void;
  direction?: Direction;
}

const { MenuGroup } = Menu;

const VerticalMenuContent = ({
   navMode = themeConfig.navMode,
      collapsed,
      routeKey,
      navigationTree = [],
      userAuthority = [],
      onMenuItemClick,
      direction = themeConfig.direction,}: VerticalMenuContentProps) => {
  const { t } = useTranslation();

  const [defaultExpandKey, setDefaultExpandKey] = useState<string[]>([]);

  const { activedRoute } = useMenuActive(navigationTree, routeKey);

  useEffect(() => {
    if (defaultExpandKey.length === 0 && activedRoute?.parentKey) {
      setDefaultExpandKey([activedRoute?.parentKey]);
    }
  }, [activedRoute?.parentKey]);

  const renderMenuItems = (navItems: NavigationTree[]) => {
    return navItems.map((nav) => {
      if (nav.subMenu && nav.subMenu.length > 0 && nav.type === NAV_ITEM_TYPE_COLLAPSE) {
        return (
          <AuthorityCheck key={nav.key} userAuthority={userAuthority} authority={nav.authority}>
            <VerticalCollapsedMenuItem
              nav={nav}
              sideCollapsed={collapsed}
              userAuthority={userAuthority}
              direction={direction}
              onLinkClick={onMenuItemClick}
            >
              {renderMenuItems(nav.subMenu)}
            </VerticalCollapsedMenuItem>
          </AuthorityCheck>
        );
      } else if (nav.type === NAV_ITEM_TYPE_ITEM) {
        return (
          <VerticalSingleMenuItem
            key={nav.key}
            nav={nav}
            sideCollapsed={collapsed}
            userAuthority={userAuthority}
            direction={direction}
            onLinkClick={onMenuItemClick}
          />
        );
      } else if (nav.type === NAV_ITEM_TYPE_TITLE) {
        return (
          <MenuGroup label={t(nav.translateKey || nav.title)} key={nav.key}>
            {nav.subMenu.map(subNav => (
              <VerticalSingleMenuItem
                key={subNav.key}
                nav={subNav}
                sideCollapsed={collapsed}
                userAuthority={userAuthority}
                direction={direction}
                onLinkClick={onMenuItemClick}
              />
            ))}
          </MenuGroup>
        );
      }
      else if (nav.type === NAV_ITEM_TYPE_COLLAPSE && (!nav.subMenu || nav.subMenu.length === 0)) {
      }
      return null;
    });
  };

  return (
    <Menu
      className="px-4 pb-4"
      variant={navMode}
      sideCollapsed={collapsed}
      defaultActiveKeys={activedRoute?.key ? [activedRoute.key] : []}
      defaultExpandedKeys={defaultExpandKey}
    >
      {renderMenuItems(navigationTree)}
    </Menu>
  );
};

export default VerticalMenuContent;
